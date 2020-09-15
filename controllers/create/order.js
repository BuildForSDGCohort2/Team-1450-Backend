import jwt from 'jsonwebtoken';
import { validationResult } from 'express-validator';
import db from '../../config/database';

const order = (req, res) => {
    // check for user input errors
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        res.status(401).json({
            status: 'error',
            error: errors.array()
        });
        return;
    }

    const { 
        status,
        productQuantity: product_quantity,
        productId: product_id,
        shippingId: shipping_id
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

        // insert into db
        const queryString = `INSERT INTO orders SET ?`;

        const { userId: user_id } = decoded;
        const  dataToDb = { 
            status,
            product_quantity,
            product_id,
            shipping_id,
            user_id
        };


        db.query(queryString, dataToDb, (dbErr, result) => {
            if(dbErr){
                res.status(401).json({
                status: 'error',
                error: dbErr.message
                });
                return;
            }
            // add order id and return 
            dataToDb.orderId = result.insertId;
                res.status(201).json({
                    status: 'success',
                    data: dataToDb
            });

            return;
    
        });

    });

};

export default order;