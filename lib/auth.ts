import { SignJWT, jwtVerify } from "jose";

import bcrypt from "bcrypt";
import { db } from "./db";

// `npm i -D @types/bcrypt`
// This file might be imported by a server component so we'll tell Next.js about the dependencies In the next.config.js we'll add bcrypt:
// Check next.config.js

interface User {
  id: string;
  email: string;
}
export const hashPassword = (password: string) => bcrypt.hash(password, 10);

export const comparePasswords = (
  plainTextPassword: string,
  hashedPassword: string
) => bcrypt.compare(plainTextPassword, hashedPassword);

export const createJWT = (user: User) => {
  // return jwt.sign({ id: user.id }, 'cookies')
  const iat = Math.floor(Date.now() / 1000);
  const exp = iat + 60 * 60 * 24 * 7;

  return new SignJWT({ payload: { id: user.id, email: user.email } })
    .setProtectedHeader({ alg: "HS256", typ: "JWT" })
    .setExpirationTime(exp)
    .setIssuedAt(iat)
    .setNotBefore(iat)
    .sign(new TextEncoder().encode(process.env.JWT_SECRET));
};

export const validateJWT = async (jwt: string | Uint8Array) => {
  const { payload } = await jwtVerify(
    jwt,
    new TextEncoder().encode(process.env.JWT_SECRET)
  );

  return payload.payload as any;
};

export const getUserFromCookie = async (cookies: any) => {
  const jwt = cookies.get(process.env.COOKIE_NAME);

  const { id } = await validateJWT(jwt.value);

  const user = await db.user.findUnique({
    where: {
      id: id as string,
    },
  });

  return user;
};
