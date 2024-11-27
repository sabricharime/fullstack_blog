import mainController from "../services/mainController";
import path from "node:path";
import fs from "node:fs";
import { config } from "../config";
import AppErrors from "../services/AppErrors";

export const upload = {
  image: mainController(async (req, res) => {
    const { imageData, imageType, imageName } = req.body;

    const imagePath = path.resolve(
      __dirname,
      "..",
      "public",
      "dist",
      "uploads",
      imageName
    );
    const dataBuffer = Buffer.from(imageData);

    if (!(imageType as string).startsWith("image")) {
      return res.status(400).json({ message: "Invalid image type" });
    }

    fs.writeFile(imagePath, dataBuffer, (err) => {
      if (err) {
        console.error(err);
        throw new AppErrors(err.message, 500);
      }
      return res.status(200).json({
        message: "Image uploaded successfully",
        url: config.base_url + "/uploads/" + imageName,
      });
    });
  }),
};
