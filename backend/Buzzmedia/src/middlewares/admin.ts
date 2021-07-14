import { Request, Response, NextFunction } from 'express';
import { User } from '../models/user';

declare global {
    namespace Express {
        interface Request {
            isAdmin?: Boolean;
        }
    }
}

export const admin = async (req: Request, res: Response, next: NextFunction) => {
    const user = await User.findById(req.userId);

    if (!user) {
        return next();
    }

    if (!user.isAdmin) {
        return next();
    }
    
    req.isAdmin = true;
    next();
}