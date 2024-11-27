import { Response } from "express";
import jwt from "jsonwebtoken";

import { config } from "../config";
const { JWT_Access, JWT_Refresh } = config;

const generateAccessToken = (res: Response, id: string | number) => {
  const token = jwt.sign({ id }, JWT_Access, { expiresIn: "30s" });
  res.cookie("JWT_Access", token, {
    httpOnly: true,
    maxAge: 15 * 60 * 1000,
    sameSite: "strict",
  });

  return token;
};

const generateRefreshToken = (res: Response, id: string | number) => {
  const token = jwt.sign({ id }, JWT_Refresh, { expiresIn: "1d" });
  res.cookie("JWT_Refresh", token, {
    httpOnly: true,
    maxAge:  15 * 60 * 1000,
    sameSite: "strict",
  });

  return token;
};

const decodedAccess = (token: string) => jwt.verify(token, JWT_Access);
const decodedRefresh = (token: string) => jwt.verify(token, JWT_Refresh);

export { generateAccessToken, generateRefreshToken, decodedAccess, decodedRefresh };
