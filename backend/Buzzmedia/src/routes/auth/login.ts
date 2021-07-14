import express, { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import { User } from '../../models/user';
import { loginValidator } from '../../validators/auth-validators';
import { validateRequest } from '../../middlewares/validate-request';
import { BadRequestError } from '../../errors/bad-request-error';

const Router = express.Router();

Router.post('/api/login', loginValidator, validateRequest,
    async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;

    const existingUser = await User.findOne({
        email: email,
    });
      
    if (!existingUser) {
        throw new BadRequestError('No user found with such email!');
    }

    const passwordMatch = await bcrypt.compare(password, existingUser.password);

    if (!passwordMatch) {
        throw new BadRequestError('Incorrect Password!');
    }

    const token = jwt.sign(
        {
            userId: existingUser.id,
        },
        'secretkey',
        {
            expiresIn: '24h',
        }
    );

    res.status(200).send({
        message: 'user logged in successfully!',
        token,
        isAdmin: existingUser.isAdmin,
        existingUser,
    });
});

export { Router as loginRouter };