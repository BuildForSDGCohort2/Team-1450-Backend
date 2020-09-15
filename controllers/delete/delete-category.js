import jwt from 'jsonwebtoken';
import db from '../../config/database';

const deleteCategory = (req, res) => {

    const categoryId = req.params.categoryId

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

            const sellerQuery = `DELETE From category WHERE category_id='${ categoryId }'`;
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
                    error: 'category id required'
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

export default deleteCategory;