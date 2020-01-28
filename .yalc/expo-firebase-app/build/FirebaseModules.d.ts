import { FirebaseModuleName, FirebaseModule } from './FirebaseApp.types';
declare const FirebaseAuth: any;
declare const FacebookAuthProvider: any;
declare const GoogleAuthProvider: any;
export declare type Auth = {
    (app?: any): Auth;
    Auth: typeof FirebaseAuth;
    FacebookAuthProvider: typeof FacebookAuthProvider;
    GoogleAuthProvider: typeof GoogleAuthProvider;
};
export declare let auth: Auth;
export declare function getModule(name: FirebaseModuleName): FirebaseModule | void;
export declare function setModule(name: FirebaseModuleName, mod: FirebaseModule): void;
export {};
