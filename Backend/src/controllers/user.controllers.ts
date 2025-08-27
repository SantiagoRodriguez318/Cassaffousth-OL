import {Request, Response} from 'express';
import {User} from '../entities/user';

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
    
    const existingInfo = await User.findOne({ where: [ { Dni },{ Telefono }] });
    if (existingInfo) {
        res.status(400).json({ message: 'DNI o número de teléfono ya están registrados' });
        return;
    }
    
    if (!user.Nombre || !user.Apellido) {
        return res.status(400).json ( { message: 'Complete los campos Nombre y apellido' } )
    }
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

        return res.json({message: 'El usuario fue modificado correctamente.'});
        
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
            return res.json({message: 'El usuario ha sido eliminado correctamente.'});
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