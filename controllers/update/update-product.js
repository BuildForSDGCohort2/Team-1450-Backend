import jwt from 'jsonwebtoken';
import { validationResult } from 'express-validator';
import db from '../../config/database';

const updateProduct = (req, res) => {
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
        productName: product_name,
        price,
        discountedPrice: discounted_price,
        brand,
        size,
        description,
        sectionId: section_id,
        sellerId: seller_id,
        productId: product_id
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

            if(err){
                res.status(401).json({
                    status: 'error',
                    error: err.message
                })
                return;
            }

            // insert into db
            const queryString = `UPDATE products SET product_name = ?, price = ?, discounted_price = ?, brand= ?, size = ?, description = ?, section_id = ?, seller_id = ? WHERE product_id = ?`;


            const  dataToDb = { 
                product_name, price, discounted_price, brand,
                size, description, section_id,seller_id 
            };


            db.query(queryString, [product_name, price, discounted_price, brand,
                size, description, section_id,seller_id, product_id ], (dbErr, result) => {
                if(dbErr){
                    res.status(401).json({
                        status: 'error',
                        error: dbErr.message
                    });
                    return;
                }

                if(result.affectedRows > 0){
                    res.status(201).json({
                        status: 'success',
                        data: dataToDb
                    });
    
                    return;
                }

                res.status(401).json({
                    status: 'error',
                    error: 'product id does not exist'
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

export default updateProduct;