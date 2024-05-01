import { Response, Request } from "express";
import { OfficeModel, getOfficeByInvCode } from "../models/officeModel";
import { getUserById } from "../models/user";
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
    await newOffice.save();

    if (author) {
      await author.offices.push(req.body.id);
      await author.save();
    } else {
      throw new Error("how tf did u make an office with no account lol");
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

export async function joinOfficeByCode(req: Request, res: Response) {
  try {
    const officeToJoin = await getOfficeByInvCode(req.params.invCode);
    const userToJoin = await getUserById(req.body.userId);
    console.log(officeToJoin);

    if (userToJoin && officeToJoin && !userToJoin.offices.includes(officeToJoin.id)) {
      await officeToJoin.users.push({
        name: userToJoin.name,
        surname: userToJoin.surname,
      });
      await userToJoin.offices.push(officeToJoin.id);
      await userToJoin.save();
      await officeToJoin.save();
    } else {
      throw new Error("No office with given invitation code or user already joined given office");
    }
    res.status(200).send({ status: "success", data: userToJoin});
  } catch (error) {
    console.error("Office POST by code method error:", error);
    res.status(500).send({
      status: "failed",
      message: "Office POST by code method failed",
      error: error,
    });
  }
}

export async function getOfficeById(req: Request, res:Response) {
  try{
    const office = await OfficeModel.findById(req.params.id);

    res.status(200).send({status: "success", data: office})
  }
  catch (error) {
    console.error("Office GET all method error:", error);
    res.status(500).send({
      status: "failed",
      message: "Office GET all method failed",
      error: error,
    });
  }
}

