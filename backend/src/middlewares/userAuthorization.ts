import { Response, Request, NextFunction } from "express";
import AppErrors from "../services/AppErrors";
import { JwtPayload, TokenExpiredError } from "jsonwebtoken";
import {
  decodedAccess,
  decodedRefresh,
  generateAccessToken,
  generateRefreshToken,
} from "../utils/tokens";
import prisma from "../db/db.main";

declare global {
  namespace Express {
    export interface Request {
      user: {
        id: string | number;
      };
    }
  }
}

type MiddlwareTypes = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<any>;

const userAuthorization: MiddlwareTypes = async (req, res, next) => {
  const token = req.cookies["JWT_Access"];
  try {
    if (!token)
      throw new AppErrors("Unauthorized , token invalid or missing ", 401);
    const credentials = decodedAccess(token) as { id: string } | JwtPayload;

    req.user = { id: credentials.id };

    next();
  } catch (error) {
    if (error instanceof TokenExpiredError) {
      const refreshToken = req.cookies["JWT_Refresh"];
      const decoded = decodedRefresh(refreshToken) as
        | { id: string }
        | JwtPayload;

      const token = generateAccessToken(res, decoded.id);
      generateRefreshToken(res, decoded.id);

      const credentials = decodedAccess(token) as
        | { id: number | string }
        | JwtPayload;

      req.user = {
        id: credentials.id,
      };

      next();
    } else {
      next(error);
    }
  }
};

const meAuthorization: MiddlwareTypes = async (req, res, next) => {
  try {
    const me = Number(req.params.id) === req.user.id; // check if the user is the same
    if (!me) {
      throw new AppErrors("Unauthorized", 401);
    }
    next();
  } catch (error) {
    next(error);
  }
};

const adminAuthorization: MiddlwareTypes = async (req, res, next) => {
  try {
    const admin = await prisma.user.findUnique({
      where: { id: Number(req.user.id) },
    });
    if (admin!.role !== "ADMIN") {
      throw new AppErrors("Unauthorized", 401);
    }
    next();
  } catch (error) {
    next(error);
  }
};

const bannedAuthorization: MiddlwareTypes = async (req, res, next) => {
  try {
    const banned = await prisma.user.findUnique({
      where: { id: Number(req.user.id) },
    });

    if (banned?.banned) {
      throw new AppErrors("User is banned", 401);
    }
    next();
  } catch (error) {
    next(error);
  }
};
export { userAuthorization, meAuthorization, adminAuthorization , bannedAuthorization };
