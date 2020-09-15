import { check } from 'express-validator';

export default [
    check('companyName').isString().withMessage('company name must be a string'),
    check('companyName').isLength({ min: 5, max: 15 }).withMessage('company name must be a string'),
    check('phoneNumber').isString().withMessage('phone number must be a string'),
    check('phoneNumber').isLength({ min: 5, max: 15 }).withMessage('phone number must be a string')
] 