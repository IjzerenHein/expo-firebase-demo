// Copyright 2018-present 650 Industries. All rights reserved.

#import <UMCore/UMUtilities.h>
#import <EXFirebaseApp/EXFirebaseApp.h>
#import <EXFirebaseApp/EXFirebaseApp+FIROptions.h>

@interface EXFirebaseApp ()

@property (nonatomic, weak) UMModuleRegistry *moduleRegistry;

@end

@implementation EXFirebaseApp {
  NSString* _appName;
  FIROptions* _appOptions;
}

UM_EXPORT_MODULE(ExpoFirebaseApp);

- (instancetype) init
{
  if (self = [super init]) {
    NSString *path = [[NSBundle mainBundle] pathForResource:@"GoogleService-Info" ofType:@"plist"];
    if (path && ![FIRApp defaultApp]) {
      [FIRApp configure];
    }
    FIRApp* defaultApp = [FIRApp defaultApp];
    if (defaultApp) {
      _appName = defaultApp.name;
      _appOptions = defaultApp.options;
    }
  }
  return self;
}

- (instancetype) initWithAppName:(nonnull NSString*)name options:(nullable FIROptions*)options
{
  if (self = [super init]) {
    _appName = name;
    _appOptions = options;
    
    // Initialize the firebase app. This will delete/create/update the app
    // if it has changed, and leaves the app untouched when the config
    // is the same.
    [self.class updateAppWithOptions:options name:name completion:^(BOOL success) {
      if (!success) {
        NSLog(@"Failed to initialize Firebase app: %@", name);
      } else {
        //NSLog(@"Initialized Firebase app: %@", name);
      }
    }];
  }
  return self;
}

- (void)setModuleRegistry:(UMModuleRegistry *)moduleRegistry
{
  _moduleRegistry = moduleRegistry;
}

- (NSDictionary *)constantsToExport
{
  NSMutableDictionary* constants = [NSMutableDictionary dictionaryWithDictionary:@{
    @"DEFAULT_NAME": _appName
  }];
  
  if (_appOptions) {
    [constants setObject:[self.class firOptionsToJSON:_appOptions] forKey:@"DEFAULT_OPTIONS"];
  }
  
  return constants;
}

- (BOOL) isAppAccessible:(nonnull NSString*)name
{
  return YES;
}

+ (void) updateAppWithOptions:(nullable FIROptions*)options name:(nonnull NSString*)name completion:(nonnull FIRAppVoidBoolCallback)completion
{
  // Default app
  FIRApp* app = [FIRApp appNamed:name];
  if (!options) {
    if (app) {
      [app deleteApp:completion];
      return;
    }
  } else {
    if (app) {
      if (![self.class firOptionsIsEqualTo:app.options compareTo:options]) {
        [app deleteApp:^(BOOL success) {
          [FIRApp configureWithName:name options:options];
          completion(YES);
        }];
        return;
      }
    } else {
      [FIRApp configureWithName:name options:options];
    }
  }
  completion(YES);
}

- (void)reject:(UMPromiseRejectBlock)reject withException:(NSException *)exception {
  NSError *error = [NSError errorWithDomain:@"ERR_FIREBASE_APP" code:4815162342 userInfo:@{
        @"message": exception.reason,
        @"code": exception.name,
    }];
  reject(exception.name, exception.reason, error);
}

- (nullable FIRApp *)getAppOrReject:(NSString*)name reject:(UMPromiseRejectBlock)reject
{
  if (name == nil) {
    name = _appName;
  }
  
  if (![self isAppAccessible:name]) {
    reject(@"ERR_FIREBASE_APP", @"The Firebase app is not accessible.", nil);
    return nil;
  }
  
  FIRApp *app = [FIRApp appNamed:name];
  if (app != nil) return app;
  reject(@"ERR_FIREBASE_APP", @"The 'default' Firebase app is not initialized. Ensure your app has a valid GoogleService-Info.plist bundled and your project has react-native-unimodules installed.", nil);
  return nil;
}

UM_EXPORT_METHOD_AS(initializeAppAsync,
                    initializeAppAsync:(nullable NSDictionary *)json
                    name:(nullable NSString*)name
                    resolve:(UMPromiseResolveBlock)resolve
                    reject:(UMPromiseRejectBlock)reject)
{
  if (name && !json) {
    reject(@"ERR_FIREBASE_APP", @"No options provided for named Firebase app", nil);
    return;
  }
  if (!name) {
    name = _appName;
    if (!name) {
      reject(@"ERR_FIREBASE_APP", @"No `GoogleService-Info.plist` configured", nil);
      return;
    }
  }
  if (![self isAppAccessible:name]) {
    reject(@"ERR_FIREBASE_APP", @"Access to the Firebase app is forbidden", nil);
    return;
  }
  
  FIROptions* options = json
    ? [self.class firOptionsWithJSON:json]
    : _appOptions;
  
  [UMUtilities performSynchronouslyOnMainThread:^{
    [self.class updateAppWithOptions:options name:name completion:^(BOOL success) {
      if (success) {
        FIRApp* app = [FIRApp appNamed:name];        
        resolve(@{
          @"name": app.name,
          @"options": [self.class firOptionsToJSON:app.options]
        });
      } else {
        reject(@"ERR_FIREBASE_APP", @"Failed to initialize Firebase app", nil);
      }
    }];
  }];
}

UM_EXPORT_METHOD_AS(getAppAsync,
                    getAppAsync:(NSString*)name
                    resolve:(UMPromiseResolveBlock)resolve
                    reject:(UMPromiseRejectBlock)reject)
{
  FIRApp* app = [self getAppOrReject:name reject:reject];
  if (!app) return;
  resolve(@{
    @"name": app.name,
    @"options": [self.class firOptionsToJSON:app.options]
  });
}

UM_EXPORT_METHOD_AS(getAppsAsync,
                    resolve:(UMPromiseResolveBlock)resolve
                    reject:(UMPromiseRejectBlock)reject)
{
  @try {
    NSDictionary<NSString *,FIRApp *>* apps = [FIRApp allApps];
    NSArray<NSString*>* names = [apps allKeys];
    NSMutableArray* results = [NSMutableArray arrayWithCapacity:names.count];
    for (int i = 0; i < names.count; i++) {
      NSString* name = names[i];
      if ([self isAppAccessible:name]) {
        FIRApp* app = apps[name];
        [results addObject:@{
          @"name": name,
          @"options": [self.class firOptionsToJSON:app.options]
        }];
      }
    }
    resolve(results);
  } @catch (NSException *exception) {
    [self reject:reject withException:exception];
  }
}

UM_EXPORT_METHOD_AS(deleteAppAsync,
                    deleteAppAsync:(NSString*)name
                    resolve:(UMPromiseResolveBlock)resolve
                    reject:(UMPromiseRejectBlock)reject)
{
  FIRApp* app = [self getAppOrReject:name reject:reject];
  if (!app) return;
  [app deleteApp:^(BOOL success) {
    if (success) {
      resolve([NSNull null]);
    } else {
      reject(@"ERR_FIREBASE_APP", @"Failed to delete Firebase app", nil);
    }
  }];
}

@end
