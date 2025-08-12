import {Request, Response} from 'express';
import {User} from '../entities/user';

export const createUser = (req:Request, res:Response) =>{
    const { firstname, lastname } = req.body;
    
    const user = new User();
    user.firstname = firstname;
    user.lastname = lastname;
    
    console.log(User);

    res.send('Hello  World')
};