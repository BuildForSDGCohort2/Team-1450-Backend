import jwt from 'jsonwebtoken';
import db from '../../config/database';

const deleteOrder = (req, res) => {

    const orderId = req.params.orderId

    const token = req.cookies.token;
    jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
        if(err){
            res.status(401).json({
                status: 'error',
                error: err.message
            });
            return;
        }


            const sellerQuery = `DELETE From orders WHERE order_id='${ orderId }'`;
            db.query(sellerQuery, (err, result) => {

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
                    error: 'order id incorrect'
                });
                return;  
            });
    });

};

export default deleteOrder;