import { Router } from "express";
import admin from "../controllers/admin.controller";
import { adminAuthorization } from "../middlewares/userAuthorization";

const adminRouter = Router();

adminRouter.patch(
  "/admin/posts/edit/:id",
  adminAuthorization,
  admin.managePosts.aprovePosts
);
adminRouter.get(
  "/admin/posts/",
  adminAuthorization,
  admin.managePosts.getAllPosts
);
adminRouter.get(
  "/admin/users/",
  adminAuthorization,
  admin.manageUsers.getAllUsers
);
adminRouter.delete(
  "/admin/posts/delete/:id",
  adminAuthorization,
  admin.managePosts.deletePost
);
adminRouter.get(
  "/admin/users/:id",
  adminAuthorization,
  admin.manageUsers.getProfileById
);

adminRouter.patch(
  "/admin/users/ban/:id",
  adminAuthorization,
  admin.manageUsers.bannUser
);
adminRouter.patch(
  "/admin/users/editByAdmin/:id",
  adminAuthorization,
  admin.manageUsers.editUser
);
adminRouter.post(
  "/admin/users/create",
  adminAuthorization,
  admin.manageUsers.createUser
);

export default adminRouter; // export the router to use it in other files
