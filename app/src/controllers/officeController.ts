import { Response, Request } from "express";
import { OfficeModel } from "../models/officeModel";

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
    await newOffice.save();
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
