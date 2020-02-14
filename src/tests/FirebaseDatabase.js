import { firebase } from "../firebase";

export const name = "FirebaseDatabase";

export async function test({ describe, beforeAll, afterAll, it, expect }) {
  describe(name, () => {
    describe("database()", async () => {
      it(`returns the default database`, async () => {
        let error = null;
        try {
          const db = firebase.database();
          expect(db).not.toBeNull();
        } catch (e) {
          error = e;
        }
        expect(error).toBeNull();
      });
    });
    /*describe("enablePersistence", async () => {
        it(`works`, async () => {
          let error = null;
          try {
            await firebase.firestore().enablePersistence();
          } catch (e) {
            error = e;
          }
          expect(error).toBeNull();
        });
      });
    });*/
  });
}
