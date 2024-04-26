import userModel from '../models/user';
import { Request, Response } from 'express';
import { createUser, getUserByEmail } from '../models/user';
import { authentication, random } from '../models/helpers';

export const register: (req: Request, res: Response) => Promise<void> = async (req: Request, res: Response) =>{
    try {
        const { email, password , repeatPassword, name, surname} = req.body;

        if( !email || !password || !repeatPassword|| !name || !surname) { 
            res.status(400).send({
                status: "failed"
            }) 
        }

        if(password !== repeatPassword) {
            res.status(403).send({
                status: "failed"
            }) 
        }

        const existingUser = await getUserByEmail(email);

        if(existingUser) { 
            res.send(400).send({
                status: "failed"
            })  
        }

        const salt = random();
        const user = new userModel({
            email,
            name,
            surname,
            authentication: {
                salt,
                password: authentication(salt, password),
                repeatPassword: authentication(salt, repeatPassword),
            } 
        });

        user.save()
    
        res.status(200).send({ status: "success", data: user });

    } catch (err){
        console.log('Error💥: ', err )
        res.status(500).json({ error: "getAllUsers error" });
    }
};

