import { Platform } from "react-native";
import { firebase } from "../firebase";

export const name = "FirebaseAnalytics";

export async function test({ describe, beforeAll, afterAll, it, expect }) {
  describe(name, () => {
    describe("logEvent()", async () => {
      it(`runs`, async () => {
        let error = null;
        try {
          await firebase.analytics().logEvent("event_name", { foo: "bar" });
        } catch (e) {
          error = e;
        }
        expect(error).toBeNull();
      });
    });
    describe("setCurrentScreen()", async () => {
      it(`runs`, async () => {
        let error = null;
        try {
          await firebase.analytics().setCurrentScreen("test-screen");
        } catch (e) {
          error = e;
        }
        expect(error).toBeNull();
      });
    });
    describe("setSessionTimeoutDuration()", async () => {
      it(
        Platform.select({ android: "runs", default: "throws unavailable" }),
        async () => {
          let error = null;
          try {
            await Anafirebase.analytics().setSessionTimeoutDuration(190000);
          } catch (e) {
            error = e;
          }
          if (Platform.OS === "android") {
            expect(error).toBeNull();
          } else {
            expect(error).not.toBeNull();
          }
        }
      );
    });
    describe("setUserId()", async () => {
      afterAll(async () => {
        await firebase.analytics().setUserId(null);
      });
      it(`runs`, async () => {
        let error = null;
        try {
          await firebase.analytics().setUserId("abcuserid");
        } catch (e) {
          error = e;
        }
        expect(error).toBeNull();
      });
    });
    describe("setUserProperties()", async () => {
      it(`runs`, async () => {
        let error = null;
        try {
          await firebase.analytics().setUserProperties({ likes_tests: "true" });
        } catch (e) {
          error = e;
        }
        expect(error).toBeNull();
      });
    });
  });
}
