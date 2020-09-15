import { check } from 'express-validator';

export default [
    check('companyName').isString().withMessage('company name must be a string'),
    check('companyName').exists().withMessage('company name must not be empty'),
    check('companyName').isLength({min: 3, max: 15 }).withMessage('company name must be less then 5 charaters and not exceed 15 characters'),
    check('address').isString().withMessage('address must be a string'),
    check('address').exists().withMessage('address must not be empty'),
    check('address').isLength({min: 5, max: 30 }).withMessage('address must be less than 5 characters and not exceed 30 characters'),
    check('sellerWebsite').isString().withMessage('seller website must be a string'),
    check('sellerWebsite').isLength({ max: 30 }).withMessage('seller website must not exceed 30 characters'),
    check('sellerName').isString().withMessage('seller name must be a string'),
    check('sellerName').isLength({ max: 22 }).withMessage('seller name must not exceed 22 characters'),
    check('sellerPhoneNumber').isString().withMessage('seller phone number must be a string'),
    check('sellerPhoneNumber').isLength({ max: 15 }).withMessage('seller phone number not exceed 15 characters'),

]