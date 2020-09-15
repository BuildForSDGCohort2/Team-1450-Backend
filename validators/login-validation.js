import { check } from 'express-validator';

export default [
    check('email').isEmail().withMessage('invalid email'),
    check('password').isLength({ min: 5, max: 15 }).withMessage('password must be more than 5 characters'),
]