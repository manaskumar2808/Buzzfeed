import express, { Request, Response, NextFunction } from 'express';
import { Task } from '../../models/task';
import { requireAuth } from '../../middlewares/require-auth';
import { validateRequest } from '../../middlewares/validate-request';
import { taskValidator } from '../../validators/task-validators';

const Router = express.Router();

Router.post('/api/tasks', requireAuth, taskValidator, validateRequest,
    async (req: Request, res: Response, next: NextFunction) => {
    const { title, description, imageUrl, timing } = req.body;
        
    const userId = req.userId as string;

    const task = Task.build({
        title, description, imageUrl, timing, userId,
    });

    await task.save();

    res.status(204).send({
        message: 'task created!',
        task,
    });
});


export { Router as createTaskRouter };