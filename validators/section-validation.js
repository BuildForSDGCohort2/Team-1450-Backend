import { check } from 'express-validator';

export default [
    check('sectionName').isString().withMessage('section must be a string'),
    check('sectionName').isLength({ min: 3, max: 15}).withMessage('section must be more than 2 letters and less than 16 letters'),
    check('categoryId').exists().withMessage('category id field must not be empty'),
    check('categoryId').isLength({ min: 1, max: 3}).withMessage('categort id must be more than 2 letters and less than 11 letters')
]