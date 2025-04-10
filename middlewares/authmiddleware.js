import jwt from "jsonwebtoken";
import { ACCESS_TOKEN_SECRET } from "../config.js";

export const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Access token missing" });
  }

  jwt.verify(token, ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
      // Check if token expired specifically
      if (err.name === "TokenExpiredError") {
        return res.status(401).json({ message: "Token expired" });
      }
      // Other verification errors (e.g., invalid signature)
      return res.status(403).json({ message: "Invalid token" });
    }

    req.user = user;
    next();
  });
};
