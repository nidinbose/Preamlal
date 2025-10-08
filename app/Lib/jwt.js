import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "dev-secret-change-me";
const COOKIE_NAME = "auth_token";
const COOKIE_MAX_AGE = 60 * 10; // 10 minutes in seconds

export function signUserToken(payload) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: COOKIE_MAX_AGE });
}

export function verifyUserToken(token) {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (e) {
    return null;
  }
}

export function buildAuthCookie(token) {
  const isProd = process.env.NODE_ENV === "production";
  return `${COOKIE_NAME}=${token}; Path=/; Max-Age=${COOKIE_MAX_AGE}; HttpOnly; SameSite=Lax${
    isProd ? "; Secure" : ""
  }`;
}

export function clearAuthCookie() {
  const isProd = process.env.NODE_ENV === "production";
  return `${COOKIE_NAME}=; Path=/; Max-Age=0; HttpOnly; SameSite=Lax${isProd ? "; Secure" : ""}`;
}

export { COOKIE_NAME };



