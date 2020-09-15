import { check } from 'express-validator';

export default [
    check('comment').isString().withMessage('comment must be a string'),
    check('comment').isLength({ min: 5, max: 255}).withMessage('comment must be more than 4'),
    check('star').isString().withMessage('star must be a string'),
    check('star').isLength({ min: 1 }).withMessage('star must not be empty'),
    check('productId').exists().withMessage('product id field must not be empty'),
    check('productId').isLength({ min: 1 }).withMessage('product id must not be empty')
]