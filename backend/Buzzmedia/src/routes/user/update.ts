import express, { Request, Response, NextFunction } from 'express';
import { User } from '../../models/user';
import { updateValidator } from '../../validators/auth-validators';
import { requireAuth } from '../../middlewares/require-auth';
import { validateRequest } from '../../middlewares/validate-request';
import { requireAdmin } from '../../middlewares/require-admin';
import { BadRequestError } from '../../errors/bad-request-error';

const Router = express.Router();

Router.put('/api/users/:id', requireAuth, requireAdmin, updateValidator, validateRequest,
    async (req: Request, res: Response, next: NextFunction) => {
    const { email, userName, name, contact, imageUrl } = req.body;

    const user = await User.findById(req.params.id);

    if (!user) {
        throw new BadRequestError('No such user exists!');
    }

    if (email !== user.email) {
        const existingUser = await User.find({ email });
        if (existingUser) {
            throw new BadRequestError('Email already exists!');
        }
    }

    if (userName !== user.userName) {
        const existingUser = await User.find({ userName });
        if (existingUser) {
            throw new BadRequestError('Username already exists!');
        }
    }

    user.set({
        name,
        contact,
        imageUrl,
    });

    await user.save();

    res.status(204).send({
        message: 'user updated!',
        user,
    });
});


export { Router as updateUserRouter };