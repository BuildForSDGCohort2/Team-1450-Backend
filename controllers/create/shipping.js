import jwt from 'jsonwebtoken';
import { validationResult } from 'express-validator';
import db from '../../config/database';

const shipping = (req, res) => {
    // check for user input errors
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        res.status(401).json({
            status: 'error',
            error: errors.array()
        });
        return
    }

    // make a copy of shipping data
    const { 
        companyName: company_name,
        phoneNumber: phone_number
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
            
            db.query(`SELECT * From shipping WHERE company_name='${ company_name }'`, (err, result) => {

                if(err){
                    res.status(401).json({
                        status: 'error',
                        error: err.message
                    });
                    return;
                }

                // check if company type exists
                if(result.length > 0){
                    res.status(401).json({
                        status: 'error',
                        error: 'shipping company already exists'
                    });
                    return;
                }

                // insert into db
                const queryString = `INSERT INTO shipping SET ?`
                db.query(queryString, { company_name, phone_number }, (dbErr, result) => {
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
                            shippingId: result.insertId,
                            phoneNumber: phone_number
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

export default shipping;