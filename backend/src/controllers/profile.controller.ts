import prisma from "../db/db.main";
import mainController from "../services/mainController";
import { hashPassword } from "../utils/hashPassword";

export const profile = {
  editProfile: mainController(async (req, res) => {
    const { id } = req.params;
    console.log(id)
    const { username, password, confirmPassword, avatar } = req.body;
    const user = await prisma.user.findUnique({
      where: {
        id: Number(id),
      },
    });

    if (!username || !password || !confirmPassword) {
      return res.status(400).json({ message: "Please fill in all fields" });
    }
    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }
    if (user) {
      const hashedPassword = await hashPassword(password);
      const updatedUser = await prisma.user.update({
        where: {
          id: Number(req.user.id),
        },
        data: {
          username,
          avatar,
        },
      });

      return res.status(200).json({ message: "Profile updated successfully" });
    }
  }),
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
        role:true,
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
};
