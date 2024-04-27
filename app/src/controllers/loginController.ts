import userModel from "../models/user";
import { Request, Response } from "express";
import { createUser, getUserByEmail } from "../models/user";
import { authentication, random } from "../models/helpers";

export const getAllUsers: (
  req: Request,
  res: Response
) => Promise<void> = async (req, res) => {
  try {
    const users = await userModel.find();
    res.json(users);
  } catch (err) {
    console.log("Error💥: ", err);
    res.status(500).json({ error: "getAllUsers error" });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { mail, password } = req.body;

    if (!mail || !password) {
      return res.status(400).json({
        status: "failed",
        message: "Email and password are required.",
      });
    }

    const user = await userModel
      .findOne({ mail })
      .select(
        "+authentication.password +authentication.salt +authentication.sessionToken"
      );

    if (!user) {
      return res.status(400).json({
        status: "failed",
        message: "Check your email address and password or create an account.",
      });
    }

    if (!user.authentication) {
      return res.status(400).json({
        status: "failed",
        message: "User authentication details not found.",
      });
    }

    const salt = user.authentication.salt;
    if (!salt) {
      return res
        .status(400)
        .json({ status: "failed", message: "Salt not found for user." });
    }

    const expectedHash = authentication(salt, password);

    if (user.authentication.password !== expectedHash) {
      return res.status(403).json({
        status: "failed",
        message: "Check your email address and password or create an account.",
      });
    }

    // Assuming authentication function generates a new session token
    const sessionToken = authentication(random(), user._id.toString());
    user.authentication.sessionToken = sessionToken;

    await user.save();
    res.cookie("MICHAL-AUTH", sessionToken, { domain: "localhost", path: "/" });

    return res.status(200).json({ status: "success", data: { user } }).end();
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};
