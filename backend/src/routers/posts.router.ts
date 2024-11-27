import { Router } from "express";
import { posts } from "../controllers/posts.controller";
import {
  bannedAuthorization,
  userAuthorization,
} from "../middlewares/userAuthorization";

const postsRouter = Router();

postsRouter.get("/posts/randomImage", posts.getRandomImage);
postsRouter.post(
  "/posts/create",
  userAuthorization,
  bannedAuthorization,
  posts.create
);
postsRouter.get(
  "/posts",
  userAuthorization,
  bannedAuthorization,
  posts.getAllPosts
);
postsRouter.get(
  "/posts/:id",
  userAuthorization,
  bannedAuthorization,
  posts.singlePost
);

export default postsRouter;
