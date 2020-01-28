package expo.modules.firebase.app;

import android.app.Activity;
import android.content.Context;
import android.os.Bundle;

import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;

import org.unimodules.core.ExportedModule;
import org.unimodules.core.Promise;
import org.unimodules.core.interfaces.ExpoMethod;
import org.unimodules.core.interfaces.RegistryLifecycleListener;

import java.util.Map;
import java.util.HashMap;
import java.util.List;
import java.util.ArrayList;

public class FirebaseAppModule extends ExportedModule implements RegistryLifecycleListener {
  private static final String NAME = "ExpoFirebaseApp";

  protected static final String ERROR_EXCEPTION = "E_FIREBASE_APP";

  static final String DEFAULT_APP_NAME = "[DEFAULT]";

  private Context mContext;
  private Map<String, String> mDefaultOptions;

  public FirebaseAppModule(Context context) {
    super(context);
    mContext = context;
  }

  @Override
  public String getName() {
    return NAME;
  }

  @Override
  public Map<String, Object> getConstants() {
    final Map<String, Object> constants = new HashMap<>();

    constants.put("DEFAULT_NAME", getAppName());

    if (mDefaultOptions == null) {
      FirebaseOptions options = getAppOptions();
      mDefaultOptions = FirebaseAppOptions.toJSON(options);
    }

    if (mDefaultOptions != null) {
      constants.put("DEFAULT_OPTIONS", mDefaultOptions);
    }

    return constants;
  }

  public String getAppName() {
    FirebaseApp app = getFirebaseApp(null);
    return (app != null) ? app.getName() : DEFAULT_APP_NAME;
  }

  public FirebaseOptions getAppOptions() {
    FirebaseApp app = getFirebaseApp(null);
    return (app != null) ? app.getOptions() : FirebaseOptions.fromResource(mContext);
  }

  public boolean isAppAccessible(final String name) {
    return true;
  }

  public FirebaseApp updateFirebaseApp(final FirebaseOptions options, final String name) {
    FirebaseApp app = getFirebaseApp(name);
    if (app != null) {
      if (options == null) {
        app.delete();
      } else {
        if (!FirebaseAppOptions.isEqual(options, app.getOptions())) {
          app.delete();
          if (name == null) {
            app = FirebaseApp.initializeApp(mContext, options);
          } else {
            app = FirebaseApp.initializeApp(mContext, options, name);
          }
        }
      }
    } else {
      if (options != null) {
        if (name == null) {
          app = FirebaseApp.initializeApp(mContext, options);
        } else {
          app = FirebaseApp.initializeApp(mContext, options, name);
        }
      }
    }

    return app;
  }

  private Bundle getBundleFromApp(final FirebaseApp app) {
    Bundle result = new Bundle();
    result.putString("name", app.getName());

    // Add options
    Map<String, String> optionsJson = FirebaseAppOptions.toJSON(app.getOptions());
    Bundle optionsBundle = new Bundle();
    for (Map.Entry<String, String> entry : optionsJson.entrySet()) {
      optionsBundle.putString(entry.getKey(), entry.getValue());
    }
    result.putBundle("options", optionsBundle);

    return result;
  }

  @ExpoMethod
  public void initializeAppAsync(final Map<String, String> options, String name, Promise promise) {
    try {
      if ((name != null) && (options == null)) {
        promise.reject(ERROR_EXCEPTION, "No options provided for custom app");
        return;
      }
      if (name == null) {
        name = getAppName();
        if (name == null) {
          promise.reject(ERROR_EXCEPTION, "Failed to determine app name");
          return;
        }
      }
      if (!isAppAccessible(name)) {
        promise.reject(ERROR_EXCEPTION, "Access forbidden to this app");
        return;
      }
      final FirebaseOptions firebaseOptions = (options != null) ? FirebaseAppOptions.fromJSON(options)
              : getAppOptions();
      FirebaseApp app = updateFirebaseApp(firebaseOptions, name);
      promise.resolve(getBundleFromApp(app));
    } catch (Exception e) {
      promise.reject(e);
    }
  }

  public static FirebaseApp getFirebaseApp(String name) {
    FirebaseApp app;
    try {
      return (name == null) ? FirebaseApp.getInstance() : FirebaseApp.getInstance(name);
    } catch (Exception e) {
      return null;
    }
  }

  private final FirebaseApp getFirebaseAppOrReject(String name, Promise promise) {
    if (name == null) {
      name = getAppName();
    }

    // Check whether access to this app is allowed
    if (!isAppAccessible(name)) {
      promise.reject(ERROR_EXCEPTION, "Access forbidden to this app");
      return null;
    }

    // Get app instance
    final FirebaseApp app = getFirebaseApp(name);
    if (app == null) {
      promise.reject(ERROR_EXCEPTION, "Firebase App not found");
      return null;
    }
    return app;
  }

  @ExpoMethod
  public void deleteAppAsync(final String name, Promise promise) {
    try {
      final FirebaseApp app = getFirebaseAppOrReject(name, promise);
      if (app == null)
        return;
      app.delete();
      promise.resolve(null);
    } catch (Exception e) {
      promise.reject(e);
    }
  }

  @ExpoMethod
  public void getAppAsync(final String name, Promise promise) {
    try {
      final FirebaseApp app = getFirebaseAppOrReject(name, promise);
      if (app == null)
        return;
      promise.resolve(getBundleFromApp(app));
    } catch (Exception e) {
      promise.reject(e);
    }
  }

  @ExpoMethod
  public void getAppsAsync(Promise promise) {
    try {
      List<FirebaseApp> apps = FirebaseApp.getApps(mContext);
      List<Bundle> bundles = new ArrayList<Bundle>();
      for (FirebaseApp app : apps) {
        if (isAppAccessible(app.getName())) {
          bundles.add(getBundleFromApp(app));
        }
      }
      promise.resolve(bundles);
    } catch (Exception e) {
      promise.reject(e);
    }
  }
}
