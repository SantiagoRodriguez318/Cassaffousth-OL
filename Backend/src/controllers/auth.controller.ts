import { Request, Response } from 'express';
import { User } from '../entities/user';
import bcrypt from 'bcrypt';
import jwt, { JwtPayload, Secret} from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();


export const SECRET_KEY = process.env.SECRET_KEY || '9b79651fea51c1039b3803556cf1b2ebcb84959ae63167ba4b54f8cce31be103';

export const Registro = async (req: Request, res: Response) => {
    try {
        const { Dni, TipoDni, Nombre, Apellido, Email, Contraseña, Telefono } = req.body;

        // Hashear la contraseña
        const ContraseñaHasheada = await bcrypt.hash(Contraseña, 10);

        // Crear un nuevo usuario
        const user = new User();
        user.Nombre = Nombre;
        user.Apellido = Apellido ;
        user.Dni = Dni;
        user.TipoDNI = TipoDni;
        user.Email =  Email;
        user.Contraseña = ContraseñaHasheada;
        user.Telefono = Telefono;

        await user.save();

        return res.status(201).json({ message: 'El usuario ha sido registrado correctamente.' });


    } catch (error) {

        if (error instanceof Error) {
            return res.status(500).json({ message: 'Error del servidor' });
        }
    }

};

export const Login = async (req: Request, res: Response) => {
    try {
        const { Email, Contraseña } = req.body;


        // Buscar el usuario por email
        const user = await User.findOne({ where: { Email } });
        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        
        // Verificar la contraseña
        const VerificarContraseña = await bcrypt.compare(Contraseña, user.Contraseña);
        if (!VerificarContraseña) {
            return res.status(401).json({ message: 'Contraseña incorrecta' });
        }

        // Generando el token JWT
        const token = jwt.sign(
        { userId: user.id },
        "${SECRET_KEY}" as Secret,
        { expiresIn: '1h' }  // El token expirará en 1 hora
        );
        res.json({ token });

    } catch (error) {
        console.error('Error en el inicio de sesión:', error);
        if (error instanceof Error) {
            return res.status(500).json({ message: 'Error del servidor' });
        }
    }
};
