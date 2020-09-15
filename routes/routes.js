import createUser from '../controllers/signup';
import createUserValidation from '../validators/create-user-validation';
import loginValidation from '../validators/login-validation';
import categoryValidation from '../validators/category-validation';
import sellerValidation from '../validators/sellers-validation';
import editCategoryValidation from '../validators/edit-category-validation';
import shippingValidation from '../validators/shipping-validation';
import sectionValidation from '../validators/section-validation';
import updateSectionValidation from '../validators/update-section-validation';
import productValidation from '../validators/product-validation';
import updateProductValidation from '../validators/update-product-validation';
import orderValidation from '../validators/order-validation';
import commentValidation from '../validators/comment-validation';
import productImageValidation from '../validators/product-image-validation';
import loginUser from '../controllers/login';
import logout from '../controllers/logout';
import category from '../controllers/create/category';
import editCategory from '../controllers/update/update-category';
import deleteCategory from '../controllers/delete/delete-category';
import createSeller from '../controllers/create/seller';
import editSeller from '../controllers/update/edit-seller';
import deleteSeller from '../controllers/delete/delete-seller';
import shipping from '../controllers/create/shipping';
import updateShipping from '../controllers/update/update-shipping';
import deleteShipping from '../controllers/delete/delete-shipping';
import section from '../controllers/create/section';
import updateSection from '../controllers/update/update-section';
import deleteSection from '../controllers/delete/delete-section';
import product from '../controllers/create/product';
import updateProduct from '../controllers/update/update-product';
import deleteProduct from '../controllers/delete/delete-product';
import order from '../controllers/create/order';
import deleteOrder from '../controllers/delete/delete-order';
import comment from '../controllers/create/comment';
import deleteComment from '../controllers/delete/delete-comment';
import productImage from '../controllers/create/product-images';
import deleteProductImage from '../controllers/delete/delete-product-image';
import getAllProducts from '../controllers/get/all-products';
import getOneProduct from '../controllers/get/one-product';



function routes(app){
    // get all products
    app.get('/product', getAllProducts);
    app.get('/product/:productId', getOneProduct);



    // user
    app.post('/create', createUserValidation, createUser);

    // product image
    app.post('/image', productImageValidation, productImage);
    app.delete('/image/:productImageId', deleteProductImage);

    // category
    app.post('/category', categoryValidation, category);
    app.put('/category', editCategoryValidation, editCategory);
    app.delete('/category/:categoryId', deleteCategory);

    // shipping
    app.post('/shipping', shippingValidation, shipping);
    app.put('/shipping', shippingValidation, updateShipping);
    app.delete('/shipping/:shippingId', deleteShipping);

    // seller
    app.post('/seller', sellerValidation, createSeller);
    app.put('/seller', sellerValidation, editSeller);
    app.delete('/seller/:sellerId', deleteSeller);

    // section
    app.post('/section', sectionValidation, section);
    app.put('/section', updateSectionValidation, updateSection);
    app.delete('/section/:sectionId', deleteSection);
    
    // product
    app.post('/product', productValidation, product);
    app.put('/product', updateProductValidation, updateProduct);
    app.delete('/product/:productId', deleteProduct);

    // order
    app.post('/order', orderValidation, order);
    app.delete('/order/:orderId', deleteOrder);

    //comment
    app.post('/comment', commentValidation, comment);
    app.delete('/comment/:commentId', deleteComment);

    // authentication and authorization
    app.post('/login', loginValidation, loginUser);
    app.post('/logout', logout);
}

export default routes;