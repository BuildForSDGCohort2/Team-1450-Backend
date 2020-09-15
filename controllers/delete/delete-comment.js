import jwt from 'jsonwebtoken';
import db from '../../config/database';

const deleteComment = (req, res) => {

    const commentId = req.params.commentId

    const token = req.cookies.token;
    jwt.verify(token, process.env.TOKEN_SECRET, (err) => {
        if(err){
            res.status(401).json({
                status: 'error',
                error: err.message
            });
            return;
        }

        const sellerQuery = `DELETE From product_comments WHERE comment_id='${ commentId }'`;
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
                error: 'comment id required'
            });
            return;
                
            });

    });

};

export default deleteComment;