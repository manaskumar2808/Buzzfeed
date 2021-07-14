import { body } from 'express-validator';

const taskValidator = [
    body('title').isLength({ min: 2 }).withMessage("Title must be atleast 2 characters long"),
    body('description').not().isEmpty().withMessage("Description must not be empty!"),
    body('imageUrl').isURL().withMessage("Please enter a valid Image URL"),
];

export { taskValidator };