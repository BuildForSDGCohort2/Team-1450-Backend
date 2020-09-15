import jwt from 'jsonwebtoken';
import { validationResult } from 'express-validator';
import db from '../../config/database';

const category = (req, res) => {
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
    const { categoryName: category_name } = req.body;
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
            
            db.query(`SELECT * From category WHERE category_name='${ category_name }'`, (err, result) => {

                if(err){
                    res.status(401).json({
                        status: 'error',
                        error: err.message
                    });
                    return;
                }

                // check if catergory exists
                if(result.length > 0){
                    res.status(401).json({
                        status: 'error',
                        error: 'category already exists'
                    });
                    return;
                }

                // insert into db
                const queryString = `INSERT INTO category SET ?`
                db.query(queryString, { category_name }, (dbErr, result) => {
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
                            categoryId: result.insertId
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

export default category;