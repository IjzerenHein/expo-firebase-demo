import * as functions from "firebase-functions";

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

export class ArgumentError extends functions.https.HttpsError {
  constructor(message: string) {
    super("invalid-argument", message);
    this.name = "ArgumentError";
  }
}

exports.echoMessage = functions.https.onCall(data => {
  const { message } = data;
  if (!message) {
    throw new ArgumentError(`Hi 👋, you did not specify a message`);
  }
  return {
    message: `Hi 👋, you said: ${message}`,
  };
});
