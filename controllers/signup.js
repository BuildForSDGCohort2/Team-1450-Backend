import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import db from '../config/database';
import { validationResult } from 'express-validator';

const signup = (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        res.status(401).json({
            status: 'error',
            error: errors.array()
        });
        return;
    }

    // grap all user inputs

    const userData =  {...req.body };
    const {
        firstName: first_name,
        lastName: last_name,
        middleName: middle_name,
        dateOfBirth: date_of_birth,
        email,
        password,
        contactAddress: contact_address,
        shippingAddress1: shipping_address_1,
        shippingAddress2: shipping_address_2,
        stateOfResidence: state_of_residence,
        gender,
        phoneNumber1: phone_number_1,
        phoneNumber2: phone_number_2,
        isAdmin: is_admin

    } = userData;

    const dataSentToDb = {
        first_name,
        last_name,
        middle_name: middle_name,
        password,
        email,
        contact_address: contact_address,
        date_of_birth: date_of_birth,
        shipping_address_1,
        shipping_address_2: shipping_address_2,
        state_of_residence,
        gender: gender,
        phone_number_1,
        phone_number_2: phone_number_2,
        is_admin: Number(is_admin) 
    };

    // check if user exists
    const checkUser = `SELECT email FROM users WHERE email='${dataSentToDb.email}'`
    db.query(checkUser,(queryErr, result) =>{
        if(queryErr){
            res.status(500).json({
                status: 'error',
                error: queryErr.message
            });
            return;
        }

        if(result.length > 0){
            res.status(401).json({
                status: 'error',
                error: 'user already exists please login'
            });
            return;
        }

        // hash password

        bcrypt.hash(dataSentToDb.password, 10, (err, hash) => {
            if(err){
                return res.status(500).json({
                    status: 'error (hash)',
                    error: err.message
                })
            }  

            // modify user password
            dataSentToDb.password = hash;

            // create user in db

            const queryString = 'INSERT INTO users SET ?'
            db.query(queryString, dataSentToDb, (dbErr, result, fields) => {

                if(dbErr){
                    res.status(500).json({
                        status: 'error (insert)',
                        error: dbErr.message
                    })
                    
                    return;
                }

                // generate token and respond

                const payload = {
                    userId: result.insertId,
                    isAdmin: dataSentToDb.is_admin
                }

                jwt.sign(payload, process.env.TOKEN_SECRET, (jwtErr, token) => {
                    if(jwtErr){
                        console.log(jwtErr)
                        res.status(500).json({
                            status: 'error (token)',
                            error: jwtErr.message
                        })
                        return;
                    }
   
                    res.cookie('token', token);
                    res.status(201).json({
                        status: 'success',
                        data: {
                            userId: result.insertId,
                            firstName: dataSentToDb.first_name,
                            last_name: dataSentToDb.last_name,
                            email: dataSentToDb.email,
                            contactAddress: dataSentToDb.contact_address
                        }
                    })
                    return;
                    
                });
                
                return;
            });

        });
    });

    return;   
};

export default signup;