import jwt from 'jsonwebtoken';
import { validationResult } from 'express-validator';
import db from '../../config/database';

const updateShipping = (req, res) => {
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
        shippingId: shipping_id,
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
            

                // insert into db
                const queryString = `UPDATE shipping SET company_name = ?, phone_number = ? WHERE shipping_id = ?`
                db.query(queryString, [company_name, phone_number, shipping_id], (dbErr, result) => {
                    if(dbErr){
                        res.status(401).json({
                            status: 'error',
                            error: dbErr.message
                        });
                        return;
                    }
                    if(result.affectedRows > 0){
                        res.status(200).json({
                            status: 'success',
                            data: {
                                shippingId: result.insertId,
                                phoneNumber: phone_number
                            }
                        });

                        return;
                    }

                    res.status(401).json({
                        status: 'error',
                        error: 'shipping id does not exist'
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

export default updateShipping;