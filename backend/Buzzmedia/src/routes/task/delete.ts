import express, { Request, Response, NextFunction } from 'express';
import { Task } from '../../models/task';
import { requireAuth } from '../../middlewares/require-auth';
import { BadRequestError } from '../../errors/bad-request-error';

const Router = express.Router();

Router.delete('/api/tasks/:id', requireAuth,
    async (req: Request, res: Response, next: NextFunction) => {
    const task = await Task.findById(req.params.id);

    if (!task) {
        throw new BadRequestError('No such task exists!');
    }

    const deletedTask = await Task.findByIdAndDelete(req.params.id);

    res.status(202).send({
        message: 'task deleted!',
        deletedTask,
    });
});

export { Router as deleteTaskRouter };