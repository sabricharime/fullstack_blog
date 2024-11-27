import { urlencoded } from "express";
import { config } from "../config";
import prisma from "../db/db.main";
import mainController from "../services/mainController";
import fs from "node:fs";
import path from "node:path";

const { base_url } = config;

const posts = {
  create: mainController(async (req, res) => {
    const { content, imageURL, title } = req.body;
    const user = await prisma.user.findUnique({
      where: { id: Number(req.user.id) },
    });
    const newPost = await prisma.post.create({
      data: {
        content,
        imageURL,
        title,
        postStatus: user?.role === "ADMIN" ? "PUBLISHED" : "PENDING",
        author: {
          connect: {
            id: Number(req.user.id),
          },
        },
      },
      include: {
        comment: true,
      },
    });
    res.json({
      message: "Created",
      ...newPost,
    });
  }),
  getAllPosts: mainController(async (req, res) => {
    const posts = await prisma.post.findMany({
      where: {
        postStatus: "PUBLISHED",
      },
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

  singlePost: mainController(async (req, res) => {
    const { id } = req.params;
    const post = await prisma.post.findUnique({
      where: {
        id: Number(id),
      },
      include: {
        author: {
          select: {
            username: true,
            avatar: true,
            id: true, // add id to select
          },
        },
      },
    });

    if (post?.postStatus === "PENDING")
      return res.json({
        title: post.title,
        message:
          "Your post has not been approved by the admin. We will review your request, and your post will be accepted if it complies with the site's policy. Stay tuned! ♥",
      });
    if (post?.postStatus === "ARCHIVED")
      return res.json({
        title: post.title,
        message:
          "This post has been added to the archive. If you believe this post is important and should not be archived, please contact the administration.",
      });
    res.json({ post });
  }),
  getRandomImage: mainController(async (req, res) => {
    const dirPath = path.resolve(__dirname, "..", "public", "dist", "uploads");
    if (!fs.existsSync(dirPath)) {
       fs.mkdir(dirPath, (err) => {
        if (err) return res.status(500).json({ message: "can't create folder" });
      })
    }

    fs.readdir(dirPath, (err, files) => {

          if (err) return res.status(500).json({ message: "can't found files " });

          console.log(files)
          return res.json(
            `${base_url +
              "/uploads/" +
              files[~~(Math.random() * files.length)]
              }`.replace(/ /g, "%20")
          );
        });

  }),
};

export { posts };
