import jwt from 'jsonwebtoken';
import db from '../../config/database';
import { validationResult } from 'express-validator';

const editSeller = (req, res) => {
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
        sellerPhoneNumber: seller_phone_number,
        sellerId: seller_id
    } = req.body;

    const objToBeSavedInDb = {
        seller_id, company_name, seller_name, seller_website, seller_phone_number, address
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

                // insert into db
                const queryString = `UPDATE sellers SET company_name = ?, address = ?, seller_website = ?, seller_name = ?, seller_phone_number = ? WHERE seller_id = ?`;
                const queryValue = [
                    objToBeSavedInDb.company_name, 
                    objToBeSavedInDb.address,
                    objToBeSavedInDb.seller_website,
                    objToBeSavedInDb.seller_name,
                    objToBeSavedInDb.seller_phone_number,
                    objToBeSavedInDb.seller_id
                ];

                db.query(queryString, queryValue, (dbErr, result) => {
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
                            data: objToBeSavedInDb
                        });

                        return;
                    }

                    res.status(401).json({
                        status: 'error',
                        error: 'seller id does not exist'
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

export default editSeller;