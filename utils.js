import jwt from "jsonwebtoken";
import { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } from "./config.js";

export const generateAccessToken = (user) => {
  return jwt.sign(
    { id: user.id, name: user.name, email: user.email },
    ACCESS_TOKEN_SECRET,
    {
      expiresIn: "15m",
    }
  );
};

export const generateRefreshToken = (user) => {
  return jwt.sign(
    { id: user.id, name: user.name, email: user.email },
    REFRESH_TOKEN_SECRET,
    {
      expiresIn: "7d",
    }
  );
};
