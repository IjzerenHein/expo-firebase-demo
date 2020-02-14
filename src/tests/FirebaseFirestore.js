import { firebase } from "../firebase";

export const name = "FirebaseFirestore";

export async function test({ describe, beforeAll, afterAll, it, expect }) {
  describe(name, () => {
    describe("enablePersistence", async () => {
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
    describe("collection.get", async () => {
      it(`returns 1 document`, async () => {
        let error = null;
        try {
          const { docs } = await firebase
            .firestore()
            .collection("tests")
            .get();
          expect(docs.length).toBe(1);
        } catch (e) {
          error = e;
        }
        expect(error).toBeNull();
      });
    });
  });
}
