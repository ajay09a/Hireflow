import jwt from "jsonwebtoken";

interface TokenPayload {
  userId: string;
  role: "candidate" | "recruiter";
}

const generateToken = (payload: TokenPayload): string => {
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    throw new Error("JWT_SECRET is not configured");
  }

  return jwt.sign(payload, secret, {
    expiresIn: "1d",
  });
};

export default generateToken;