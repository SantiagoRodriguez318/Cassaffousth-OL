import express, { Request, Response } from 'express';
import { Router } from 'express';
import  { User } from '../entities/user';
import bcrypt from 'bcrypt';
import jwt, { JwtPayload, Secret} from 'jsonwebtoken';
import dotenv from 'dotenv';
import { SECRET_KEY } from '../controllers/auth.controller';
dotenv.config();

const router = Router();
const user = new User();

export function VerifyToken(req: Request, res: Response, next: () => void) {
    const token = req.headers.authorization?.split(" ")[1];
    console.log(token);
    if (!token) {
        return res.status(401).json({ message: 'Acceso denegado.'});
    }
    try 
    {
        const decoded = jwt.verify(token, SECRET_KEY);
        req.body.user = decoded;
        console.log(req.body.user);

        next();
    } 
    catch (error) 
    {
        console.log("Error al verificar el token:", error);
        res.status(401).json({ message: "Token inválido."});
    }

};

router.get('/userinfo' , VerifyToken, async (req: Request, res: Response) =>{
    try {
        const { userId }= req.body.user;
        const user = await User.findOneBy ({ id: userId });
        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        } 
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: 'Error del servidor' });
        }
    }
});

