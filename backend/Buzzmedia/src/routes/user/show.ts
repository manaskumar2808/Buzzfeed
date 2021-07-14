import express, { Request, Response, NextFunction } from 'express';

import { User } from '../../models/user';
import { requireAuth } from '../../middlewares/require-auth';
import { requireAdmin } from '../../middlewares/require-admin';

const Router = express.Router();

Router.get('/api/users/currentuser', requireAuth,
    async (req: Request, res: Response) => {
    const user = await User.findById(req.userId);
    res.status(200).send({
        message: 'current user fetched successfully!',
        currentUser: user || null,
    });
});

Router.get('/api/users', requireAuth, requireAdmin,
    async (req: Request, res: Response, next: NextFunction) => {
    const field = req.query.orderBy;
    const ascending = req.query.ascending ? 1 : -1;

    const page = parseInt(req.query.page as string);
    const perpage = 3;
    const offset = (page - 1) * perpage;

    if (field) {
        const managers = await User.find({
           isAdmin: false,
        }).skip(offset).limit(perpage).sort({
            field: ascending,
        });
    
        return res.status(200).send({
            message: 'managers fetched successfully!',
            managers,
        });
    }

    const managers = await User.find({ isAdmin: false }).skip(offset).limit(perpage);
    res.status(200).send({
        message: 'managers fetched successfully!',
        managers,
    });
});

export { Router as showUserRouter };