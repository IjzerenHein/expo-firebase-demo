import { firebase } from "../firebase";

export const name = "FirebasePerformance";

export async function test({ describe, beforeAll, afterAll, it, expect }) {
  describe(name, () => {
    describe("trace", async () => {
      it(`returns trace object`, async () => {
        let error = null;
        try {
          const trace = await firebase.performance().trace("unit-test");
          expect(trace).not.toBeNull();
        } catch (e) {
          error = e;
        }
        expect(error).toBeNull();
      });
    });
  });
}
