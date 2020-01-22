import { firebase } from "../firebase";

export const name = "FirebaseMessaging";

export async function test({ describe, beforeAll, afterAll, it, expect }) {
  describe(name, () => {
    describe("isSupported", async () => {
      it(`returns true`, async () => {
        let error = null;
        try {
          const isSupported = firebase.messaging.isSupported();
          expect(isSupported).toBe(true);
        } catch (e) {
          error = e;
        }
        expect(error).toBeNull();
      });
    });
  });
}
