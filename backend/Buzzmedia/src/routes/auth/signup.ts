import express, { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

import { User } from '../../models/user';
import { signupValidator } from '../../validators/auth-validators';
import { validateRequest } from '../../middlewares/validate-request';
import { BadRequestError } from '../../errors/bad-request-error';

const Router = express.Router();

Router.post('/api/signup', signupValidator, validateRequest,
    async (req: Request, res: Response, next: NextFunction) => {
    const { userName, email, name, contact, imageUrl, password } = req.body;

    console.log(req.body);

    const existingUser = await User.findOne({
        $or: [
            { email },
            { userName },
        ]
    });

    if (existingUser) {
        throw new BadRequestError('Given email or username is already occupied!');
    }

    const user = User.build({
        userName,
        email,
        name,
        contact,
        imageUrl,
        password,
        isAdmin: false,
    });

    await user.save();

    const token = jwt.sign(
        {
            userId: user.id,
        },
        'secretkey',
        {
            expiresIn: '24h',
        }
    );

    res.status(201).send({
        message: 'user signed up successfully!',
        token,
        isAdmin: false,
        user,
    });
});


export { Router as signupRouter };