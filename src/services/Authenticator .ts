import * as jwt from "jsonwebtoken";

export class Authenticator {
  private static getExpireIn() {
    return process.env.EXPIRES_IN;
  }

  public generateToken(input: AuthenticationData): string {
    const token = jwt.sign(
      {
        id: input.id,
        role: input.role
      },
      process.env.JWT_KEY as string,
      {
        expiresIn: Authenticator.getExpireIn(),
      }
    );
    return token;
  }

  public getData(token: string): AuthenticationData {
    const payload = jwt.verify(token, process.env.JWT_KEY as string) as any;
    const result = {
      id: payload.id,
      role: payload.role
    };
    return result;
  }
}

interface AuthenticationData {
  id: string;
  role: string;
}