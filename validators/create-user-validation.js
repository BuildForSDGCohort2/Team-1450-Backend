import { check } from 'express-validator';

export default [
    check('firstName').isString(),
    check('firstName').isLength({ max: 20 }).withMessage('first name too long'),
    check('lastName').isString(),
    check('lastName').isLength({ max: 20 }).withMessage('last name too long'),
    check('middleName').isString(),
    check('middleName').isLength({ max: 20 }).withMessage('middle name too long'),
    check('email').isEmail().withMessage('invalid email'),
    check('password').isLength({ min: 5 }).withMessage('password must be more than 5 characters'),
    check('phoneNumber1').isString().isLength({ max: 13 }),
    check('shippingAddress1').isString().isLength({ max: 60 }),
    check('contactAddress').isString().isLength({ max: 60 }),
    check('stateOfResidence').isString().isLength({ max: 15 }),
    check('isAdmin').isInt({ min: 0, max: 1}).withMessage('0 or 1')
]