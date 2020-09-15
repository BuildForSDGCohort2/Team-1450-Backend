import { check } from 'express-validator';

export default [
    check('categoryName').isString().withMessage('category must be a string'),
    check('categoryName').exists().withMessage('category field must not be empty'),
    check('categoryId').isNumeric().withMessage('category_id must not be empty')

]