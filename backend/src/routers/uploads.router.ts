import { Router } from "express";
import { upload } from "../controllers/upload.controller";

const uploadsRouter = Router();
uploadsRouter.post("/upload/img", upload.image);


export {uploadsRouter}
