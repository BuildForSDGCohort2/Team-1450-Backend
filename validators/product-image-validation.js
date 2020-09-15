import { check } from 'express-validator';

export default [
    check('productId').isInt().withMessage('product id should be an integer and must not be empty')
]