import express, { Request, Response, NextFunction } from 'express';

import { Task } from '../../models/task';
import { requireAuth } from '../../middlewares/require-auth';
import { NotFoundError } from '../../errors/not-found-error';

const Router = express.Router();

Router.get('/api/tasks/:id', requireAuth,
    async (req: Request, res: Response) => {
    
    const task = await Task.findById(req.params.id);
        
    if (!task) {
        throw new NotFoundError();
    }

    res.status(200).send({
        message: 'current task fetched successfully!',
        task,
    });
});

Router.get('/api/tasks', requireAuth,
    async (req: Request, res: Response, next: NextFunction) => {
    const page = parseInt(req.query.page as string);
    const perpage = 5;
    const offset = (page - 1) * perpage;

    const tasks = await Task.find({ userId: req.userId as string }).skip(offset).limit(perpage);
        
    res.status(200).send({
        message: 'tasks fetched successfully!',
        tasks,
    });
});

export { Router as showTaskRouter };