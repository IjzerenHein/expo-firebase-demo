export interface IFirebaseRecaptchaVerifier {
  readonly type: string;
  verify(): Promise<string>;
}

export class FirebaseRecaptchaVerifier implements IFirebaseRecaptchaVerifier {
  private token: string;

  constructor(token: string) {
    this.token = token;
  }

  get type(): string {
    return "recaptcha";
  }

  async verify(): Promise<string> {
    return this.token;
  }
}
