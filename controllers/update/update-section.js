import jwt from 'jsonwebtoken';
import { validationResult } from 'express-validator';
import db from '../../config/database';

const section = (req, res) => {
    // check for user input errors
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        res.status(401).json({
            status: 'error',
            error: errors.array()
        });
        return;
    }

    // make a copy of category
    const { 
        sectionName: section_name,
        categoryId: category_id,
        sectionId: section_id
     } = req.body;
    const token = req.cookies.token;
    jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
        if(err){
            res.status(401).json({
                status: 'error',
                error: err.message
            });
            return;
        }

        // check if user is an admin
        if(decoded.isAdmin){
            
            const queryString = `UPDATE section SET section_name='${ section_name }', category_id='${category_id}' WHERE section_id = '${section_id}'`;
            db.query(queryString, (err, result, f) => {

                if(err){
                    res.status(401).json({
                        status: 'error',
                        error: err.message
                    });
                    return;
                }

                if(result.affectedRows > 0){
                    res.status(200).json({
                        status: 'success',
                        data: {
                            sectionName: section_name,
                            sectionId: section_id
                        }
                    });
                    return;
                }

                res.status(401).json({
                    status: 'error',
                    error: 'section id does not exist'
                });
                return;
                
            });


            return
        }

        res.status(401).json({
            status: 'error',
            error: 'only admin is allowed'
        });
        return;
    });
};

export default section;