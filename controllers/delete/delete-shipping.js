import jwt from 'jsonwebtoken';
import db from '../../config/database';

const deleteShipping = (req, res) => {

    const shippingId = req.params.shippingId

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

            const shippingQuery = `DELETE From shipping WHERE shipping_id='${ shippingId }'`;
            db.query(shippingQuery, (err, result) => {

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
                    error: 'shipping id not found'
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

export default deleteShipping;