import { validationResult }from 'express-validator';
import cloudinary from '../../config/cloudinary'; 
import db from '../../config/database';

const productImageUpload = (req, res) => {

    const productImage = req.files.image;
    const { productId: product_id } = req.body;

    const errors = validationResult(req);

    if(!errors.isEmpty()){
        res.status(401).json({
            status: "error",
            error: errors.array()
        });
    }


    cloudinary.uploader.upload(productImage.tempFilePath, (err, cloudinaryResult) => {
        if(err){
            res.status(401).json({
                status: "error",
                error: err.message
            });
            return;
        }
        const { secure_url } = cloudinaryResult;

        // insert into db
        const queryString = 'INSERT INTO product_images SET ?'
        db.query(queryString, { secure_url, product_id }, (dbErr, result) => {
            if(dbErr){
                res.status(401).json({
                    status: "error",
                    error: dbErr.message
                });
                return;
            }

            // add image id

            res.status(201).json({
                status: 'success',
                data: {
                    image_id: result.insertId,
                    productId: product_id,
                    url: secure_url
                }
            });
            return;
        })

    });
};

export default productImageUpload;