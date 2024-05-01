import { Response, Request } from "express";
import { OfficeModel } from "../models/officeModel";
import  { getUserById }  from "../models/user"
import mongoose from "mongoose";

export async function getOffice(req: Request, res: Response) {
  try {
    const offices = await OfficeModel.find();
    res.status(200).json({ status: "success", data: { offices } });
  } catch (error) {
    console.error("Office GET method error:", error);
    res.status(500).send({
      status: "failed",
      message: "Office GET method failed",
      error: error,
    });
  }
}

export async function sendOffice(req: Request, res: Response) {
  try {
    const newOffice = new OfficeModel(req.body);
    const author = await getUserById(req.body.authorId);
    await newOffice.save()

    if(author){
          await author.offices.push(req.body.id);
    }
    else{
      throw new Error("how tf did u make an office with no account lol")
    }


    res.status(200).send({ status: "success", data: newOffice });
  } catch (error) {
    console.error("Office POST method error:", error);
    res.status(500).send({
      status: "failed",
      message: "Office POST method failed",
      error: error,
    });
  }
}
