import express from "express";
import { canUserReview, createProductByAdmin,
     createProductBySeller,
      createReview,
      deleteImage,
      deleteProduct, 
      deleteProductBySeller, 
      deleteReview, 
      getAllProducts,
       getProductById, 
       getProductReview, 
       getProductsByAdmin,
        getProductsBySeller,
         updateProduct,
          updateProductBySeller,
           uploadImages } from "../../controller/productController.js";
import { authoriseRoles, isAuthenticatedUser } from "../../middlewares/auth.js";
const productRouter=express.Router();

//admin
productRouter.post('/admin/addProduct',isAuthenticatedUser,authoriseRoles('admin') ,createProductByAdmin)
productRouter.put('/admin/updateProduct/:id',isAuthenticatedUser,authoriseRoles('admin') ,updateProduct)
productRouter.delete('/admin/deleteProduct/:id',isAuthenticatedUser,authoriseRoles('admin') ,deleteProduct)
productRouter.get('/admin/getProductsByAdmin',isAuthenticatedUser,authoriseRoles('admin') ,getProductsByAdmin)
productRouter.put('/admin/uploadImages/:id',isAuthenticatedUser,authoriseRoles('admin') ,uploadImages)
productRouter.put('/admin/deleteImage/:id',isAuthenticatedUser,authoriseRoles('admin') ,deleteImage)
productRouter.delete('/admin/deleteReview',isAuthenticatedUser,authoriseRoles('admin') ,deleteReview)

//Seller
productRouter.post('/seller/createProductBySeller',isAuthenticatedUser,authoriseRoles('seller') ,createProductBySeller)
productRouter.put('/seller/updateProductBySeller/:id',isAuthenticatedUser,authoriseRoles('seller') ,updateProductBySeller)
productRouter.delete('/seller/deleteProductBySeller/:id',isAuthenticatedUser,authoriseRoles('seller') ,deleteProductBySeller)
productRouter.get('/seller/getProductsBySeller',isAuthenticatedUser,authoriseRoles('seller') ,getProductsBySeller)

productRouter.get('/getAllProducts',getAllProducts)
productRouter.get('/getProductById/:id',getProductById)
//review
productRouter.put('/createReview',isAuthenticatedUser,createReview);

productRouter.get('/getProductReview',isAuthenticatedUser,getProductReview);
productRouter.get("/canUserReview",isAuthenticatedUser,canUserReview)



export default productRouter;