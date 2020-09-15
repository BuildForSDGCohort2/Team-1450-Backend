import jwt from 'jsonwebtoken';
import db from '../../config/database';
import { validationResult } from 'express-validator';

const deleteSeller = (req, res) => {
    const errors = validationResult(req);
    
    // if error found in user input
    if(!errors.isEmpty()){
        res.status(401).json({
            status: 'error',
            error: errors.array()
        });
        return;
    }

    const sellerId = req.params.sellerId

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

            const sellerQuery = `DELETE From sellers WHERE seller_id='${ sellerId }'`;
            db.query(sellerQuery, (err, result, fields) => {

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
                        data: 'deleted successfully'
                    });
    
                    return;
                }

                res.status(401).json({
                    status: 'error',
                    error: 'seller idnot found'
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

export default deleteSeller;