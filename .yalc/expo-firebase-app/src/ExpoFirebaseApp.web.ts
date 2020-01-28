import { getFirebaseOptionsFromManifest } from './GoogleServices';
import { FirebaseOptions } from './FirebaseApp.types';

export default {
  get name(): String {
    return 'ExpoFirebaseApp';
  },

  get DEFAULT_OPTIONS(): FirebaseOptions {
    return getFirebaseOptionsFromManifest();
  },
};
