import { firebase } from "../firebase";

export const name = "FirebaseInstallations";

export async function test({ describe, beforeAll, afterAll, it, expect }) {
  describe(name, () => {
    describe("getId", async () => {
      it(`runs`, async () => {
        let error = null;
        try {
          const id = await firebase.installations().getId();
          expect(id).not.toBeNull();
        } catch (e) {
          error = e;
        }
        expect(error).toBeNull();
      });
    });
  });
}
