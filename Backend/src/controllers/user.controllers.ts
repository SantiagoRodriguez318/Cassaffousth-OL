import {Request, Response} from 'express';
import {User} from '../entities/user';
import { error } from 'console';
import { TipoDNI } from '../enum';

export const crearUsuario = async (req:Request, res:Response) =>{
try {
        const { Dni , TipoDNI, Nombre , Apellido , Email , Contraseña , Telefono } = req.body;
    
    
    const user = new User();
    user.Dni = Dni;
    user.TipoDNI = TipoDNI
    user.Nombre = Nombre;
    user.Apellido = Apellido;
    user.Email = Email;
    user.Contraseña = Contraseña
    user.Telefono = Telefono;
    
    const existingMail = await User.findOne({ where: [{ Email }, { Dni }, { Telefono }] });
    if (existingMail) {
        res.status(400).json({ message: 'El email, DNI o número de teléfono ya están registrados' });
        return;
    }
    
    if (!user.Nombre || !user.Apellido) throw new Error
    await user.save()
    
    console.log(user);
    
    return res.json(user);

} catch (error) {
    if (error instanceof Error)
        {
        return res.status(500).json({message: 'Algo salió mal.'});
        }
    }
};

export const consultarUsuarios = async (req:Request, res:Response) => {

    try 
    {
        const users = await User.find()
        return res.json(users)
    
    } catch (error) 
    {
        if (error instanceof Error){
            return res.status(500).json({message: error.message})
        }    
    }
};

export const actualizarUsuario = async (req:Request, res:Response) =>{
    try {
        const {id} = req.params;
        const user = await User.findOneBy({id: parseInt(req.params.id!, 10)})


        if (!user) return res.status(404).json({message: 'El usuario no existe.'})
        await User.update({id: parseInt(id!, 10)}, {
            Nombre: req.body.Nombre,
            Apellido: req.body.Apellido,
            Dni: req.body.Dni,
            TipoDNI: req.body.TipoDNI,
            Email: req.body.Email,
            Telefono: req.body.Telefono,
        })

        return res.sendStatus(204)
        } catch (error) 
            {
                if (error instanceof Error){
                return res.status(500).json({message: error.message})}
            }
}

export const borrarUsuario = async (req:Request, res:Response) =>{

    try {
            const {id} = req.params;

            const resultado = await User.delete({id: parseInt(id!, 10)});    
            if (resultado.affected === 0 ) {
                return res.status(404).json ({message: 'Usuario no encontrado, no se pudo eliminar.'})
            }
            return res.sendStatus(204);
        } 
        catch (error) {
        if (error instanceof Error){
            return res.sendStatus(500).json({message: error.message})
        }
    }
}

export const consultarUsuario = async (req:Request, res:Response) => {
    try {
        const {id} = req.params;

        const user = await User.findOneBy({id: parseInt(id!, 10)}) 
        return res.json(user)
        } 
    catch (error) {
        if (error instanceof Error){
            return res.status(500).json({message: error.message});
        }
    }
}