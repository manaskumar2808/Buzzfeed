import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface UserPayload {
    userId: string,
}

declare global {
    namespace Express {
        interface Request {
            userId?: String;
        }
    }
}

export const currentUser = (req: Request, res: Response, next: NextFunction) => {
    const token = req.get('Authorization')?.split(' ')[1];

    if (!token) {
        return next();
    }

    try {
        const payload = jwt.verify(token, 'secretkey') as UserPayload;
        req.userId = payload.userId;
    } catch(err) {
        console.log(err);
    }

    next();
}