import { firebase } from "../firebase";

export const name = "FirebaseRemoteConfig";

export async function test({ describe, beforeAll, afterAll, it, expect }) {
  describe(name, () => {
    describe("fetch", async () => {
      it(`runs`, async () => {
        let error = null;
        try {
          await firebase.remoteConfig().fetch();
        } catch (e) {
          error = e;
        }
        expect(error).toBeNull();
      });
    });
  });
}
