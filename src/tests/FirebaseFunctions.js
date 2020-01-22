import { firebase } from "../firebase";

export const name = "FirebaseFunctions";

export async function test({ describe, beforeAll, afterAll, it, expect }) {
  describe(name, () => {
    describe("httpsCallable()", async () => {
      it(`calls the echo function`, async () => {
        let error = null;
        try {
          const message = "I'm a unit test";
          const echoMessage = firebase.functions().httpsCallable("echoMessage");
          const response = await echoMessage({ message });
          const responseMessage = response.data.message;
          expect(responseMessage).toBe(`Hi 👋, you said: ${message}`);
        } catch (e) {
          error = e;
        }
        expect(error).toBeNull();
      });
    });
  });
}
