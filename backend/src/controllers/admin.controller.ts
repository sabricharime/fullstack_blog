import prisma from "../db/db.main";
import AppErrors from "../services/AppErrors";
import mainController from "../services/mainController";
import { hashPassword } from "../utils/hashPassword";

const admin = {
  managePosts: {
    getAllPosts: mainController(async (req, res) => {
      const posts = await prisma.post.findMany({
        include: {
          author: {
            select: {
              username: true,
              avatar: true,
            },
          },
        },
      });

      res.json(posts);
    }),
    createPost: mainController(async (req, res) => {
      res.status(201).send("post created success fully");
    }),
    aprovePosts: mainController(async (req, res) => {
      const { id } = req.params;
      const { postStatus } = req.body;

      const newPost = await prisma.post.update({
        where: { id: Number(id) },
        data: {
          postStatus: postStatus as "PUBLISHED" | "ARCHIVED" | "PENDING",
        },
      });
      res.status(200).json(newPost);
    }),
    deletePost: mainController(async (req, res) => {
      const { id } = req.params;
      const post = await prisma.post.delete({ where: { id: Number(id) } });
      res.status(200).json(post);
    }),
  },

  manageUsers: {
    getProfileById: mainController(async (req, res) => {
      const id = Number(req.params.id);
      const user = await prisma.user.findUnique({
        where: {
          id: Number(id),
        },
        select: {
          id: true,
          username: true,
          email: true,
          avatar: true,
          role: true,
          banned: true,

          posts: {
            select: {
              id: true,
              title: true,
              imageURL: true,
            },
          },
        },
      });
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      return res.status(200).json(user);
    }),
    getAllUsers: mainController(async (req, res) => {
      const users = await prisma.user.findMany({
        select: {
          username: true,
          posts: true,
          comment: true,
          avatar: true,
          role: true,
          banned: true,
          id: true,
          email: true,
          _count: true,
          follower: true,
          following: true,
          likes: true,
          password: false,
        },
      });

      res.json(users);
    }),

    bannUser: mainController(async (req, res) => {
      const id = Number(req.params.id);
      const { action } = req.body;

      const user = await prisma.user.findUnique({ where: { id } });

      if (user?.role !== "ADMIN") {
        const userEdited = await prisma.user.update({
          where: {
            id: id,
          },
          data: {
            banned: Boolean(action),
          },
        });
        return res.json(userEdited);
      } else {
        throw new AppErrors("You can't ban admin like you ", 403);
      }
    }),
    editUser: mainController(async (req, res) => {
      const id = Number(req.params.id);
      const { role, email, username, avatar, banned } = req.body;
      const user = await prisma.user.update({
        where: {
          id,
        },
        data: {
          role,
          email,
          username,
          avatar,
          banned,
        },
      });
      res.json({ ...user, password: undefined });
    }),
    createUser: mainController(async (req, res) => {
      const { username, email, password, role, avatar } = req.body;
      const Hpass = await hashPassword(password);
      const user = await prisma.user.create({
        data: {
          username,
          email,
          password: Hpass,
          role,
          avatar,
        },
      });
      res.json(user);
    }),
  },
};

export default admin;
