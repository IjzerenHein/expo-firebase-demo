const FirebaseAuth = '';
const FacebookAuthProvider = '';
const GoogleAuthProvider = '';
/*export { FirebaseAnalytics } from '@firebase/analytics-types';
export { FirebaseAuth, FacebookAuthProvider, GoogleAuthProvider } from '@firebase/auth-types';
export { FirebaseDatabase } from '@firebase/database-types';
export { FirebaseFirestore } from '@firebase/firestore-types';
export { FirebaseFunctions } from '@firebase/functions-types';
export { FirebaseMessaging } from '@firebase/messaging-types';
export { FirebasePerformance } from '@firebase/performance-types';
export { RemoteConfig as FirebaseRemoteConfig } from '@firebase/remote-config-types';
export { FirebaseStorage } from '@firebase/storage-types';
*/
//export let analytics: (app?: any) => FirebaseTypes.FirebaseAnalytics;
export let auth;
/*export let database: (app?: any) => FirebaseTypes.FirebaseDatabase;
export let firestore: (app?: any) => FirebaseTypes.FirebaseFirestore;
export let functions: (app?: any) => FirebaseTypes.FirebaseFunctions;
export let messaging: (app?: any) => FirebaseTypes.FirebaseMessaging;
export let performance: (app?: any) => FirebaseTypes.FirebasePerformance;
export let remoteConfig: (app?: any) => FirebaseTypes.FirebaseRemoteConfig;
export let storage: (app?: any) => FirebaseTypes.FirebaseStorage;*/
export function getModule(name) {
    switch (name) {
        /*case 'analytics':
          analytics = func;
          break;*/
        case 'auth':
            return auth;
        /*case 'database':
          database = func;
          break;
        case 'firestore':
          firestore = func;
          break;
        case 'functions':
          functions = func;
          break;
        case 'messaging':
          messaging = func;
          break;
        case 'performance':
          performance = func;
          break;
        case 'remoteConfig':
          remoteConfig = func;
          break;
        case 'storage':
          storage = func;
          break;*/
    }
}
export function setModule(name, mod) {
    switch (name) {
        /*case 'analytics':
          analytics = func;
          break;*/
        case 'auth':
            auth = mod;
            break;
        /*case 'database':
          database = func;
          break;
        case 'firestore':
          firestore = func;
          break;
        case 'functions':
          functions = func;
          break;
        case 'messaging':
          messaging = func;
          break;
        case 'performance':
          performance = func;
          break;
        case 'remoteConfig':
          remoteConfig = func;
          break;
        case 'storage':
          storage = func;
          break;*/
    }
}
//# sourceMappingURL=FirebaseModules.js.map