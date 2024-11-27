import { Router } from "express";
import { profile } from "../controllers/profile.controller";
import {
  bannedAuthorization,
  meAuthorization,
  userAuthorization,
} from "../middlewares/userAuthorization";

const profileRouter = Router();

profileRouter.patch(
  "/profile/patch/:id",
  userAuthorization,
  meAuthorization,
  profile.editProfile
);

profileRouter.get(
  "/profile/:id",
  userAuthorization,
  bannedAuthorization,
  profile.getProfileById
);
profileRouter.patch(
  "/profile/edit/:id",
  userAuthorization,
  meAuthorization,
  profile.editProfile
);

export default profileRouter; // Export the router to use it in other files
