import { Response, Request } from "express";
import { OfficeModel } from "../models/officeModel";
import userModel from "../models/user"
import mongoose from "mongoose";

export async function getUserOffices(req: Request, res: Response) {
    try {
      const offices = await OfficeModel.find({authorId: req.params.userId});
      res.status(200).json({ status: "success", data: { offices }, length: offices.length });
    } catch (error) {
      console.error("Office GET method error:", error);
      res.status(500).send({
        status: "failed",
        message: "Office GET method failed",
        error: error,
      });
    }
  }