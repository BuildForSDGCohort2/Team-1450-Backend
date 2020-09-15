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
        categoryId: category_id
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
            
            db.query(`SELECT * From section WHERE section_name='${ section_name }'`, (err, result) => {

                if(err){
                    res.status(401).json({
                        status: 'error',
                        error: err.message
                    });
                    return;
                }

                // check if section exists
                if(result.length > 0){
                    res.status(401).json({
                        status: 'error',
                        error: 'section already exists'
                    });
                    return;
                }

                // insert into db
                const queryString = `INSERT INTO section SET ?`
                db.query(queryString, { section_name, category_id }, (dbErr, result) => {
                    if(dbErr){
                        res.status(401).json({
                            status: 'error',
                            error: dbErr.message
                        });
                        return;
                    }
                    res.status(201).json({
                        status: 'success',
                        data: {
                            sectionId: result.insertId
                        }
                    });

                    return;

                });
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