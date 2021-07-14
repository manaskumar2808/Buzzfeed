import express, { Request, Response, NextFunction } from 'express';
import { User } from '../../models/user';
import { requireAuth } from '../../middlewares/require-auth';
import { requireAdmin } from '../../middlewares/require-admin';
import { BadRequestError } from '../../errors/bad-request-error';

const Router = express.Router();

Router.delete('/api/users/:id', requireAuth, requireAdmin,
    async (req: Request, res: Response, next: NextFunction) => {
    const user = await User.findById(req.params.id);

    if (!user) {
        throw new BadRequestError('No such user exists!');
    }

    const deletedUser = await User.findByIdAndDelete(req.params.id);

    res.status(202).send({
        message: 'user deleted!',
        deletedUser,
    });
});

export { Router as deleteUserRouter };