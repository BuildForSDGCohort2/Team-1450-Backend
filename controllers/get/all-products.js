/*eslint quotes: ["error", "single"]*/
import db from '../../config/database';

const getAllProducts = (req, res) => {

    const getAllProducts = `SELECT product_id, product_name, price, discounted_price, brand, size, description,
    section_id, seller_id FROM products`;

    const getAllImages = `SELECT url, product_id FROM product_images`;
    db.query(getAllProducts, (err, result) => {
        if(err){
            res.status(404).json({
                status: 'error',
                error: 'an error ocurred'
            });
            return;
        }

        const copyOfProducts = [...result];


        db.query(getAllImages, (dbErr, answer) => {
            if(dbErr){
                res.status(404).json({
                    status: 'error',
                    error: 'an error ocurred'
                });
                return;
            }

            // populate images array
            copyOfProducts.forEach(element => {
                const singleProductImageLinks = answer.filter(img => {
                   
                    return img.product_id == element.product_id;
                });
                
                element.images = singleProductImageLinks;
            });

            
            res.status(200).json({
                status: 'success',
                data: copyOfProducts
            });

            return;
        });
    })

};

export default getAllProducts;