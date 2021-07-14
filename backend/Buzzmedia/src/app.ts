import express, { Request, Response } from 'express';
import { json } from 'body-parser';

import { errorHandler } from './middlewares/error-handler';

import { loginRouter } from './routes/auth/login';
import { signupRouter } from './routes/auth/signup';
import { updateUserRouter } from './routes/user/update';
import { deleteUserRouter } from './routes/user/delete';
import { showUserRouter } from './routes/user/show';
import { createTaskRouter } from './routes/task/create';
import { updateTaskRouter } from './routes/task/update';
import { deleteTaskRouter } from './routes/task/delete';
import { showTaskRouter } from './routes/task/show';
import { currentUser } from './middlewares/current-user';
import { admin } from './middlewares/admin';

const app = express();
app.use(json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

app.use(currentUser);
app.use(admin);

app.use(loginRouter);
app.use(signupRouter);
app.use(updateUserRouter);
app.use(deleteUserRouter);
app.use(showUserRouter);
app.use(createTaskRouter);
app.use(updateTaskRouter);
app.use(deleteTaskRouter);
app.use(showTaskRouter);

app.all('*', (req: Request, res: Response) => {
    throw new Error('API route not found!');
});

app.use(errorHandler);

export { app };