import { firebase } from "../firebase";
import * as FileSystem from "expo-file-system";

export const name = "FirebaseStorage";

export async function test({ describe, beforeAll, afterAll, it, expect }) {
  describe(name, () => {
    /*beforeAll(async () => {
    });

    afterAll(async () => {
    });*/

    describe("listAll()", async () => {
      it(`returns 1 public file`, async () => {
        let error = null;
        try {
          const files = await firebase
            .storage()
            .ref("public")
            .listAll();
          expect(files.items.length).toBe(1);
        } catch (e) {
          error = e;
        }
        expect(error).toBeNull();
      });
    });

    describe("getDownloadURL()", async () => {
      it(`returns valid url`, async () => {
        let error = null;
        try {
          const files = await firebase
            .storage()
            .ref("public")
            .listAll();
          expect(files.items.length).toBe(1);
          const file = files.items[0];
          const downloadUrl = await file.getDownloadURL();
          expect(typeof downloadUrl).toBe("string");
          const startUrl = "https://firebasestorage.googleapis.com";
          expect(downloadUrl.substring(0, startUrl.length)).toBe(startUrl);
        } catch (e) {
          error = e;
        }
        expect(error).toBeNull();
      });
      it(`downloads the file`, async () => {
        let error = null;
        try {
          const files = await firebase
            .storage()
            .ref("public")
            .listAll();
          expect(files.items.length).toBe(1);
          const file = files.items[0];
          const downloadUrl = await file.getDownloadURL();
          const { uri } = await FileSystem.downloadAsync(
            downloadUrl,
            FileSystem.documentDirectory + file.name
          );
          expect(typeof uri).toBe("string");
          expect(uri).not.toBeNull();
        } catch (e) {
          error = e;
        }
        expect(error).toBeNull();
      });
    });

    describe("putFile()", async () => {
      it(`upload file succesfully`, async () => {
        let error = null;
        try {
          const currentUser = firebase.auth
            ? firebase.auth().currentUser
            : undefined;
          const suffix = new Date().toISOString().replace(/\D/g, "");
          const fileContent = new ArrayBuffer(1000);
          const ref = firebase
            .storage()
            .ref(`users/${currentUser.uid}`)
            .child(`unittest`);
          // @ts-ignore
          const uploadTask = ref.put(fileContent);
          await new Promise((resolve, reject) => {
            uploadTask.on(
              firebase.storage.TaskEvent.STATE_CHANGED,
              snapshot => {},
              reject,
              resolve
            );
          });
        } catch (e) {
          error = e;
        }
        expect(error).toBeNull();
      });
    });
  });
}
