import { body } from 'express-validator';

const signupValidator = [
    body('userName').notEmpty().withMessage('Username is required!'),
    body('email').notEmpty().withMessage('Email is mandatory!').isEmail().withMessage('Please enter a valid email address'),
    body('password').notEmpty().withMessage('Password is required!').isLength({ min: 8 }).withMessage('Password must contain atleast 8 characters!'),
    body('name').notEmpty().withMessage('Name is required!'),
];

const loginValidator = [
    body('email').notEmpty().withMessage('Email is mandatory!').isEmail().withMessage('Please enter a valid email address'),
    body('password').notEmpty().withMessage('Password is required!').isLength({ min: 8 }).withMessage('Password must contain atleast 8 characters!'),
];

const updateValidator = [
    body('userName').notEmpty().withMessage('Username is required!'),
    body('email').notEmpty().withMessage('Email is mandatory!').isEmail().withMessage('Please enter a valid email address'),
    body('password').notEmpty().withMessage('Password is required!').isLength({ min: 8 }).withMessage('Password must contain atleast 8 characters!'),
    body('name').notEmpty().withMessage('Name is required!'),
];

export { signupValidator, loginValidator, updateValidator };