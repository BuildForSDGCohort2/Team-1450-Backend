import jwt from 'jsonwebtoken';
import db from '../../config/database';
import { validationResult } from 'express-validator';

const createSeller = (req, res) => {
    const errors = validationResult(req);
    
    // if error found in user input
    if(!errors.isEmpty()){
        res.status(401).json({
            status: 'error',
            error: errors.array()
        });
        return;
    }

    const { 
        companyName: company_name,
        address,
        sellerWebsite: seller_website,
        sellerName: seller_name,
        sellerPhoneNumber: seller_phone_number
    } = req.body;

    const objToBeSavedInDb = {
        company_name, seller_name, seller_website, seller_phone_number, address
    };

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

            const sellerQuery = `SELECT * From sellers WHERE company_name='${ company_name }'`;
            db.query(sellerQuery, (err, result) => {

                if(err){
                    res.status(401).json({
                        status: 'error',
                        error: err.message
                    });
                    return;
                }

                // check if seller exists
                if(result.length > 0){
                    res.status(401).json({
                        status: 'error',
                        error: 'seller already exists'
                    });
                    return;
                }

                // insert into db
                const queryString = `INSERT INTO sellers SET ?`
                db.query(queryString, objToBeSavedInDb, (dbErr, result) => {
                    if(dbErr){
                        res.status(401).json({
                            status: 'error',
                            error: dbErr.message
                        });
                        return;
                    }
                    objToBeSavedInDb.sellerId = result.insertId;

                    res.status(201).json({
                        status: 'success',
                        data: objToBeSavedInDb
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

export default createSeller;