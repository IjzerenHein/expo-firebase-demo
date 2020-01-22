import { firebase } from "../firebase";

export const name = "FirebaseAuth";

export async function test({ describe, beforeAll, afterAll, it, expect }) {
  describe(name, () => {
    describe("currentUser", async () => {
      it(`is signed in`, async () => {
        let error = null;
        try {
          const { currentUser } = firebase.auth();
          expect(currentUser).not.toBeNull();
        } catch (e) {
          error = e;
        }
        expect(error).toBeNull();
      });
      it(`has valid fields`, async () => {
        let error = null;
        try {
          const currentUser = firebase.auth();
          if (!currentUser) return;
          const { uid, displayName, isAnonymous, providerId } = currentUser;
          expect(uid).not.toBeNull();
          expect(displayName).not.toBeNull();
          expect(isAnonymous).not.toBeNull();
          expect(providerId).not.toBeNull();
        } catch (e) {
          error = e;
        }
        expect(error).toBeNull();
      });
    });
  });
}
