import { Request, Response, NextFunction } from "express";

type Main = (req: Request, res: Response, next: NextFunction) => Promise<any>;

const mainController = (controller: Main): Main => {
  return async (req, res, next) => {
    try {
      await controller(req, res, next);
    } catch (error) {
      next(error);
    }
  };
};

export default mainController;
