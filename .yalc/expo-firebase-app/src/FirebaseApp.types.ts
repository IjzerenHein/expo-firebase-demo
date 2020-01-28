export interface FirebaseOptions {
  appId: string;
  apiKey: string;
  databaseURL: string;
  trackingId: string;
  messagingSenderId: string;
  storageBucket: string;
  projectId: string;
  authDomain: string;
}

export type FirebaseModuleName =
  | 'analytics'
  | 'auth'
  | 'database'
  | 'firestore'
  | 'functions'
  | 'messaging'
  | 'performance'
  | 'remoteConfig'
  | 'storage';

export type FirebaseModule = any;
