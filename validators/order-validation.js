import { check } from 'express-validator';

export default [
    check('status').isString().withMessage('status must be a string'),
    check('status').isLength({ min: 4 }).withMessage('status length must be more than 3 characters'),
    check('productQuantity').isInt().withMessage('product quantity must be an integer'),
    check('productQuantity').isLength({ min: 1 }).withMessage('product quantity must not be empty'),
    check('productId').isInt().withMessage('product id must be a string'),
    check('productId').isLength({ min: 1 }).withMessage('product id must not be empty'),
    check('shippingId').isInt().withMessage('shipping id must be a string'),
    check('shippingId').isLength({ min: 1 }).withMessage('shipping id length must not be empty')
]