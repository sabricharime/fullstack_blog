import { Router } from "express";
import auth from "../controllers/auth.controller";
import { bannedAuthorization, userAuthorization } from "../middlewares/userAuthorization";

const authRouter = Router();

authRouter.post("/auth/register", auth.register);
authRouter.post("/auth/login", auth.login);

authRouter.post("/auth/logout", auth.logout);
authRouter.get("/auth/getMe", userAuthorization,bannedAuthorization,auth.getMe);

export default authRouter;
