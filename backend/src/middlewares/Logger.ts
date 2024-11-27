import { NextFunction, Request, Response } from "express";

export default function (req: Request, res: Response, next: NextFunction) {
  console.log(`

**********************

Path   : ${req.path}

**********************

method : ${req.method}

**********************

    `);
  next();
}
