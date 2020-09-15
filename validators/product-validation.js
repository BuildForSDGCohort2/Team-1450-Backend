import { check } from 'express-validator';

export default [
    check('productName').isString().withMessage('product must be a string'),
    check('productName').isLength({ min: 5 }).withMessage('decription length must be more than 4 characters'),
    check('price').isString().withMessage('price must be a string'),
    check('price').isLength({ min: 1 }).withMessage('price length must not be empty'),
    check('discountedPrice').isString().withMessage('discounted price must be a string'),
    check('discountedPrice').isLength({ min: 1 }).withMessage('discounted price length must not be empty'),
    check('brand').isString().withMessage('brand must be a string'),
    check('brand').isLength({ min: 5 }).withMessage('brand length must be more than 5 characters'),
    check('size').isString().withMessage('size must be a string'),
    check('size').isLength({ min: 5 }).withMessage('size length must be more than 4 characters'),
    check('description').isString().withMessage('description must be a string'),
    check('description').isLength({ min: 5 }).withMessage('description length must be more than 5 characters'),
    check('sectionId').isInt().withMessage('section id must be a string'),
    check('sectionId').isLength({ min: 1 }).withMessage('section id must not be empty'),
    check('sellerId').isInt().withMessage('seller id must be a string'),
    check('sellerId').isLength({ min: 1 }).withMessage('seller id length must not be empty')   
]