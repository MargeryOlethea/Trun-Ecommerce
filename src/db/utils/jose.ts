import { UserLoginPayload } from "@/app/types/all.types";
import * as jose from "jose";

const SECRET_KEY = process.env.JWT_SECRET_KEY;
if (!SECRET_KEY) {
  throw new Error("JWT_SECRET_KEY is not defined");
}

const secret = new TextEncoder().encode(SECRET_KEY);
const alg = "HS256";

export const signToken = async (payload: UserLoginPayload) => {
  const token = (await new jose.SignJWT({ payload })
    .setProtectedHeader({ alg })
    .setIssuedAt()
    .sign(secret)) as string;

  return token;
};

export const verifyToken = async <T>(token: string) => {
  const payload = await jose.jwtVerify<T>(token, secret);

  return payload.payload;
};
