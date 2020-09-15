import jwt from 'jsonwebtoken';
import { validationResult } from 'express-validator';
import db from '../../config/database';

const product = (req, res) => {
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
        sellerId: seller_id
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
            // check if product exists
            db.query(`SELECT * From products WHERE product_name='${ product_name }'`, (err, result) => {

                if(err){
                    res.status(401).json({
                        status: 'error',
                        error: err.message
                    });
                    return;
                }

                // check if product exists
                if(result.length > 0){
                    res.status(401).json({
                        status: 'error',
                        error: 'product already exists'
                    });
                    return;
                }


                    if(err){
                        res.status(401).json({
                            status: 'error',
                            error: err.message
                        })
                        return;
                    }

                    // insert into db
                    const queryString = `INSERT INTO products SET ?`;


                    const  dataToDb = { 
                        product_name, price, discounted_price, brand,
                        size, description, section_id,seller_id 
                    };


                    db.query(queryString, dataToDb, (dbErr, result) => {
                        if(dbErr){
                            res.status(401).json({
                                status: 'error',
                                error: dbErr.message
                            });
                            return;
                        }
                        // add product id and return 
                        dataToDb.productId = result.insertId;
                        res.status(201).json({
                            status: 'success',
                            data: dataToDb
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

export default product;