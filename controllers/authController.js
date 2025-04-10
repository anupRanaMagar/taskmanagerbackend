import bcrypt from "bcryptjs";
import db from "../drizzle/db.js";
import { users } from "../drizzle/schema.js";
import { eq } from "drizzle-orm";
import { generateAccessToken, generateRefreshToken } from "../utils.js";
import jwt from "jsonwebtoken";
import { REFRESH_TOKEN_SECRET } from "../config.js";

export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  await db.insert(users).values({
    name,
    email,
    hashedPassword,
  });
  res.json({ message: "User registered successfully" });
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await db.query.users.findFirst({
    where: eq(users.email, email),
  });
  if (!user) return res.status(401).json({ message: "Invalid credentials" });

  const isPasswordValid = await bcrypt.compare(password, user.hashedPassword);
  if (!isPasswordValid)
    return res.status(401).json({ message: "Invalid credentials" });

  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: true, // set true in production with HTTPS
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });

  res.json({ accessToken });
};

export const logoutUser = (req, res) => {
  res.clearCookie("refreshToken", {
    httpOnly: true,
    sameSite: "Strict",
    secure: true, //TODO set true in production with HTTPS
  });

  res.json({ message: "Logged out successfully" });
};

export const refreshToken = (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) return res.sendStatus(401);

  jwt.verify(refreshToken, REFRESH_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);

    const newAccessToken = generateAccessToken(user);
    res.json({ newAccessToken });
  });
};
