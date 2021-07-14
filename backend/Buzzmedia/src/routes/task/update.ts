import express, { Request, Response, NextFunction } from 'express';
import { Task } from '../../models/task';
import { taskValidator } from '../../validators/task-validators';
import { requireAuth } from '../../middlewares/require-auth';
import { validateRequest } from '../../middlewares/validate-request';
import { BadRequestError } from '../../errors/bad-request-error';
import { NotFoundError } from '../../errors/not-found-error';

const Router = express.Router();

Router.put('/api/tasks/:id', requireAuth, taskValidator, validateRequest,
    async (req: Request, res: Response, next: NextFunction) => {
    const { title, description, imageUrl, time } = req.body;

    const task = await Task.findById(req.params.id);

    if (!task) {
        throw new NotFoundError();
    }

    task.set({
        title,
        description,
        imageUrl,
        time
    });

    await task.save();

    res.status(204).send({
        message: 'task updated!',
        task,
    });
});


export { Router as updateTaskRouter };