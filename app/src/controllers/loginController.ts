import userModel from '../models/user'
import { Request, Response } from 'express';

export const getAllUsers: (req: Request, res: Response) => Promise<void> = async (req, res) => {
    try {
        const users = await userModel.find()
        res.json(users)
    }catch (err) {
        console.log('Error💥: ', err )
        res.status(500).json({ error: "getAllUsers error" });
    }
}