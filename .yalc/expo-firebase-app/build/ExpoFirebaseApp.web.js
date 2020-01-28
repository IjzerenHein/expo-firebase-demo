import { getFirebaseOptionsFromManifest } from './GoogleServices';
export default {
    get name() {
        return 'ExpoFirebaseApp';
    },
    get DEFAULT_OPTIONS() {
        return getFirebaseOptionsFromManifest();
    },
};
//# sourceMappingURL=ExpoFirebaseApp.web.js.map