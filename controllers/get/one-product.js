/*eslint quotes: ["error", "single"]*/
import db from '../../config/database';

const getOneProduct = (req, res) => {

    const { productId } = req.params;
    const convertedProductId = Number(productId);

    if(typeof convertedProductId !== 'number' || convertedProductId < 1){
   
        res.status(404).json({
            status: 'error',
            error: 'please input product id'
        });
        return;
 
    }

    const getOneQuery = `SELECT product_id, product_name, price, discounted_price, brand, size, description,
    section_id, seller_id FROM products WHERE product_id='${convertedProductId}'`;

    const getAllImages = `SELECT url, product_id FROM product_images WHERE product_id='${convertedProductId}'`;
    db.query(getOneQuery, (err, result) => {
        if(err){
            res.status(404).json({
                status: 'error',
                error: 'an error ocurred'
            });
            return;
        }
        // check if product exists
        if(result.length > 0){
            const copyOfProduct = result[0];
            db.query(getAllImages, (dbErr, answer) => {
                if(dbErr){
                    res.status(404).json({
                        status: 'error',
                        error: 'an error ocurred'
                    });
                    return;
                }
                
                copyOfProduct.images = answer;

                res.status(200).json({
                    status: 'success',
                    data: copyOfProduct
                });
                return;
            });
        } else{
            res.status(404).json({
                status: 'error',
                error: 'client error'
            });
            return;
        }
        
        
    });

};

export default getOneProduct;