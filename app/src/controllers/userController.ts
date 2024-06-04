import { Response, Request } from "express";
import { OfficeModel } from "../models/officeModel";
import userModel from "../models/user";
import mongoose from "mongoose";

export async function getUserMadeOffices(req: Request, res: Response) {
  try {
    const offices = await OfficeModel.find({ authorId: req.params.userId });
    res
      .status(200)
      .json({ status: "success", data: { offices }, length: offices.length });
  } catch (error) {
    console.error("Office GET method error:", error);
    res.status(500).send({
      status: "failed",
      message: "Office GET method failed",
      error: error,
    });
  }
}

export async function getUserAllOffices(req: Request, res: Response) {
  try {
    const userOffices = await userModel.findOne({ _id: req.params.userId });
    if (userOffices) {
      let userOfficesObj = [];

      for (let i = 0; i < userOffices.offices.length; i++) {
        userOfficesObj.push(await OfficeModel.findOne({ id: userOffices.offices[i] }))
      }

      res
        .status(200)
        .json({
          status: "success",
          data: userOfficesObj,
          length: userOfficesObj.length,
        });
    } else {
      throw new Error("No user with given ID");
    }
  } catch (error) {
    console.error("Office GET method error:", error);
    res.status(500).send({
      status: "failed",
      message: "Office GET method failed",
      error: error,
    });
  }
}
