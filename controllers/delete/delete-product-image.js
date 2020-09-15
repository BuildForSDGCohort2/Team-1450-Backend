import jwt from 'jsonwebtoken';
import db from '../../config/database';
import cloudinary from '../../config/cloudinary';

const deleteProductImage = (req, res) => {

    const productImageId = req.params.productImageId

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

            // get product image id from db, delete image from cloudinary and db
            const publicIdQuery = `SELECT public_id FROM product_images WHERE image_id = '${productImageId}'`; 
            db.query(publicIdQuery, (err, result) => {

                if(err){
                    res.status(401).json({
                        status: 'error',
                        error: err.message
                    });
                    return;
                }
                // check id image exists in db 
                if(result.length){

                    const{ public_id: publicId } = result[0];

                    cloudinary.uploader.destroy(publicId, { invalidate: true}, (err, returneData) => {
                        if(err){
                            res.status(500).json({
                                status: 'success',
                                error: 'cloudinary error'
                            });
                            return;
                        }
                        console.log('cloudinary result', returneData)
                        if(returneData.result === 'ok'){

                            // delete from database
                            const deleteString = `DELETE FROM product_images WHERE image_id='${productImageId}'`;
                            db.query(deleteString, (dbErr, result) => {
                                if(dbErr){
                                    res.status(500).json({
                                        status: 'error',
                                        error: dbErr.message
                                    });
                                    return;
                                }
                                console.log(result)
                                if(result.affectedRows > 0){
                                    console.log('got here 1')
                                    res.status(200).json({
                                        status: 'success',
                                        error: 'image deleted successfully'
                                    });
                                    console.log('got here 2')
                                    return;
                                }

                                res.status(401).json({
                                    status: 'error',
                                    error: 'image id not correct'
                                });
                                return;

                            });
                            
                        } else{
                            res.status(401).json({
                                status: 'error',
                                error: 'delete error'
                            });
                            return;
                        }
                    })
                    
                }

                res.status(401).json({
                    status: 'error',
                    error: 'image does not exist'
                });
                return;
                
            });

        }

        res.status(401).json({
            status: 'error',
            error: 'only admin is allowed'
        });
        return;
    });

};

export default deleteProductImage;