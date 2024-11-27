import mainController from "../services/mainController";
import prisma from "../db/db.main";
import AppErrors from "../services/AppErrors";
import { comparePassword, hashPassword } from "../utils/hashPassword";
import { generateAccessToken, generateRefreshToken } from "../utils/tokens";

const auth = {
  register: mainController(async (req, res) => {
    const { username, email, password, avatar } = (await req.body) as {
      [key: string]: string;
    };

    const user = await prisma.user.findUnique({ where: { email } });
    if (user) throw new AppErrors("User allrady existe ", 409);

    const hashedPassword = await hashPassword(password);

    const createdUser = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
        avatar,
      },
      select: {
        username: true,
        email: true,
        password: false,
        id: true,
      },
    });

    const accessToken = generateAccessToken(res, createdUser.id);
    const refreshToken = generateRefreshToken(res, createdUser.id);

    res.json({
      ...createdUser,
      id: "",
      accessToken,
      refreshToken,
    });
  }),
  login: mainController(async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
      throw new AppErrors("Fill all fileds ", 409);
    }
    const userCheck = await prisma.user.findUnique({ where: { email } });
    if (!userCheck) throw new AppErrors("User not Found ", 404);
    const isMatch = await comparePassword(password, userCheck.password);
    console.log(isMatch);
    if (!isMatch) throw new AppErrors("Invalid credentials ", 409);

    res.clearCookie("JWT_Access");
    res.clearCookie("JWT_Refresh");

    generateAccessToken(res, userCheck.id);
    generateRefreshToken(res, userCheck.id);

    const user = await prisma.user.findUnique({
      where: {
        email: userCheck.email,
      },
      select: {
        email: true,
        password: false,
        username: true,
      },
    });

    res.json({ ...user });
  }),

  logout: mainController(async (req, res) => {
    res.clearCookie("JWT_Access");
    res.clearCookie("JWT_Refresh");
    res.json({
      message: "Logged out",
      statusCode: 200,
    });
  }),

  getMe: mainController(async (req, res, next) => {
    try {
      const user = await prisma.user.findUnique({
        where: {
          id: Number(req.user.id),
        },
        select: {
          id: true,
          email: true,
          username: true,
          avatar: true,
          role: true,
          banned: true,
        },
      });
      if (!user) return res.status(404).json({ error: "User not found" });

      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  }),
};

export default auth;
