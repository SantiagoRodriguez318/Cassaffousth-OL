import { Request, Response, NextFunction } from 'express';

export const validateEmail = (req: Request, res: Response, next: NextFunction) => {
    const { Email } = req.body;

    if (!Email) {
        return res.status(400).json({ message: 'El email es requerido' });
    }

    if (!Email.includes('@')) {
        return res.status(400).json({ message: 'El email debe contener un @' });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/i
    if (!emailRegex.test(Email)) {
        return res.status(400).json({ message: 'El formato del email no es válido' });
    }

    next();
};

export const validatePhone = (req:Request, res: Response, next: NextFunction) => {

    const { Telefono }= req.body;
    if (!Telefono) {
        return res.status(400).json ( { message: 'El número de teléfono es requerido'})
    }

    const TelRegex = /^[\d\s\-\(\)\+]{8,15}$/;;
    if (!TelRegex.test(Telefono)){
        return res.status(400).json ( { message: 'Formato de número incorrecto.'} )
    } 

    const digitCount = Telefono.replace(/\D/g, '').length;
    if (digitCount < 8 || digitCount > 15 ) {
        return res.status(400).json ( { message: 'El teléfono debe tener entre 8 y 15 digitos'} )
    }

    next ();
};

