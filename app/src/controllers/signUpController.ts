import userModel from '../models/user';
import { Request, Response } from 'express';
import { createUser, getUserByEmail } from '../models/user';
import { authentication, random } from '../models/helpers';

export const register: (req: Request, res: Response) => Promise<void> = async (req: Request, res: Response) =>{
    try {
        const { mail, password , repeatPassword, name, surname} = req.body;
        //console.log('1)Email:', email)
        if (!mail || !password || !repeatPassword || !name || !surname) { 
            res.status(400).send({
                status: "failed",
                message: "All fields are required"
            });
            return; // Dodaj return, aby przerwać dalsze wykonywanie kodu w przypadku braku wymaganych pól
        }
        //console.log('2)Email:', email)
        if(password !== repeatPassword) {
            res.status(403).send({
                status: "failed",
                message: "Passwords do not match"
            });
            return; // Dodaj return, aby przerwać dalsze wykonywanie kodu w przypadku niezgodności haseł
        }
        //console.log('3)Email:', email)
        const existingUser = await getUserByEmail(mail);

        if(existingUser) { 
            res.status(400).send({
                status: "failed",
                message: "User with this email already exists"
            });
            return; // Dodaj return, aby przerwać dalsze wykonywanie kodu w przypadku istnienia użytkownika o podanym adresie e-mail
        }
        console.log('4)Email:', mail)
        const salt = random();
        const user = new userModel({
            mail: mail,
            name,
            surname,
            authentication: {
                salt,
                password: authentication(salt, password),
                repeatPassword: authentication(salt, repeatPassword),
            } 
        });
        //console.log('5)Email:', email)
        console.log('User:', user)
        await user.save(); // Dodaj await przed user.save(), aby upewnić się, że operacja zapisu zostanie zakończona przed kontynuacją
        //console.log('6)Email:', email)
        res.status(200).send({ status: "success", data: user });
        //console.log('7)Email:', email)
    } catch (err){
        console.log('Error💥: ', err )
        res.status(500).json({ error: "An error occurred while processing your request" });
    }
};
