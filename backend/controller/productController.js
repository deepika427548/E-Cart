import productModel from "../Models/productModel.js";
import orderModel from "../Models/orderModel.js";
import errorHandler from "../utils/errorHandler.js";
import asyncHandler from "../middlewares/asyncHandler.js";
import ApiFilters from "../utils/apiFilters.js";
import { upload_file,delete_file } from "../utils/cloudinary.js";

//get all products >>>> http://localhost:4444/api/v1/product/getAllProducts
export const getAllProducts=async(req,res,next)=>{
const rePerPage=4;
    //create an instance of apiFilter and call search fuction
    // console.log(req.query);
    
    const apiFilters=new ApiFilters(productModel,req.query).search().filter();

    let product= await apiFilters.query;
    const filteredProductCount=product.length

    
      
    apiFilters.pagination(rePerPage);
    product=await apiFilters.query.clone();
    

    // const products=await productModel.find();
//    console.log("user:",req.user);
   
    res.status(200).json({filteredProductCount,rePerPage,product,})
}


// get single product ... http://localhost:4444/api/v1/product/getProductById/:id

export const getProductById=asyncHandler(async(req,res,next)=>{

    const product=await productModel.findById(req.params.id).populate('reviews.user');

    if(!product){
        // console.log("product not found");
        // return res.status(404).json({error:"Product Not Found"})
        return next(new errorHandler("product not found",400))
       
    }

    res.status(200).json({product,})
})



//                >>>>>>>>>>>>>>>>>>>>>> ADMIN <<<<<<<<<<<<<<<<<<<<<<<<<<<



//Admin creates new products  http://localhost:4444/api/v1/product/admin/addProduct
export const createProductByAdmin=asyncHandler(async(req,res)=>{

    req.body.user=req.user._id  //assign the 'user' of productModel  to the id of current user who initiate the request

    const newProduct=await productModel.create(req.body);


    res.status(200).json({message:'new product has been created',newProduct,})
})



// update theproduct ... http://localhost:4444/api/v1/product/admin/updateProduct/:id

export const updateProduct=asyncHandler(async(req,res,next)=>{

    let product=await productModel.findById(req.params.id);

    if(!product){
        // console.log("product not found");
        // return res.status(404).json({error:"Product Not Found"})

        return next(new errorHandler("product not found",400))
       
    }

    product= await productModel.findByIdAndUpdate(req.params.id,req.body,{new:true})


    res.status(200).json({message:"product updated",product,})
})




// upload images ... http://localhost:4444/api/v1/product/admin/uploadImages/:id

export const uploadImages=asyncHandler(async(req,res,next)=>{

    let product=await productModel.findById(req.params.id);

    if(!product){
        // console.log("product not found");
        // return res.status(404).json({error:"Product Not Found"})

        return next(new errorHandler("product not found",400))
       
    }

    const uploader=async(image)=>upload_file(image,"e-cart/products")

    const urls=await Promise.all((req?.body?.images).map(uploader));

    product?.images?.push(...urls);

    await product?.save();



    
    res.status(200).json({message:"image uploaded",product,})
})


// delete image images ... http://localhost:4444/api/v1/product/admin/deleteImage/:id

export const deleteImage=asyncHandler(async(req,res,next)=>{

    let product=await productModel.findById(req.params.id);

    if(!product){
        // console.log("product not found");
        // return res.status(404).json({error:"Product Not Found"})

        return next(new errorHandler("product not found",400))
       
    }

    const isDeleted=await delete_file(req.body.imgId);

    if(isDeleted){
        product.images=product?.images?.filter(
            (img)=>img.public_id !== req.body.imgId
        );
    }

  

    await product?.save();



    
    res.status(200).json({message:"image deleted",product,})
})


// get the products ... http://localhost:4444/api/v1/product/admin/getProductsByAdmin

export const getProductsByAdmin=asyncHandler(async(req,res,next)=>{

    let products=await productModel.find();

   


    res.status(200).json({success:true,products,})
})



// delete theproduct ... http://localhost:4444/api/v1/product/admin/deleteProduct/:id

export const deleteProduct=asyncHandler(async(req,res,next)=>{

    let product=await productModel.findById(req.params.id);

    if(!product){
        // console.log("product not found");
        // return res.status(404).json({error:"Product Not Found"})
        return next(new errorHandler("product not found",400))
       
    }
    //deleting the image associated with product

    for(let i=0;i<product?.images?.length;i++){
       await delete_file(product?.images[i].public_id); 
    }

    await product.deleteOne();


    res.status(200).json({message:'the product is deleted successfully'})
})

//Create  Update Review  api/v1/product/createReview
// export const createReview=asyncHandler(async(req,res,next)=>{

//     const {rating,comment,productId}=req.body;

//     const review={
//         user:req?.user?._id,
//         rating:Number(rating),
//         comment,
//     }
//     let product=await productModel.findById(productId);

//     if(!product){
    
//         return next(new errorHandler("product not found",400))
       
//     }

//     //check if the user already reviwe the product if so update the product review

//     const isReviewed=product?.reviews?.find(
//         (r)=>r.user.toString() === req?.user?._id.toString()
//     )

//     if(isReviewed){
//         product.reviews.forEach((review)=>{
//             if(review?.user?.toString() === req?.user?._id.toString()){
              
//                 review.comment=comment;
//                 review.rating=rating;
//             }
//         });

//         product.markModified('reviews');

//     }else{
//         product.reviews.push(review);
//         product.num_of_reviews=product.reviews.length;

//     }

//     product.rating=product.reviews.reduce((acc,item)=> item.rating + acc,0) / 
//     product.reviews.length;

//     await product.save({validateBeforeSave : false });


//     res.status(200).json({
//         success:true,
//     })


// })
export const createReview = asyncHandler(async (req, res, next) => {
    const { rating, comment, productId } = req.body;

    const review = {
        user: req?.user?._id,
        rating: Number(rating),
        comment,
    };

    let product = await productModel.findById(productId);

    if (!product) {
        return next(new errorHandler("Product not found", 400));
    }

    // Check if the user has already reviewed the product
    const isReviewed = product.reviews.find(
        (r) => r.user.toString() === req.user._id.toString()
    );

    if (isReviewed) {
        // Update the existing review
        isReviewed.comment = comment;
        isReviewed.rating = rating;

        // Mark the reviews array as modified so Mongoose knows to save it
        product.markModified('reviews');
    } else {
        // Add a new review
        product.reviews.push(review);
        product.num_of_reviews = product.reviews.length;
    }

    // Update product's overall rating
    product.rating =
        product.reviews.reduce((acc, item) => item.rating + acc, 0) /
        product.reviews.length;

    await product.save({ validateBeforeSave: false });

    res.status(200).json({
        success: true,
    });
});

//Get product reviews /api/product/getProductReview


export const getProductReview=asyncHandler(async(req,res,next)=>{

    const product = await productModel.findById(req.query.id);
    if (!product) {
        return next(new errorHandler("Product not found", 400));
    }

    res.status(200).json({
        reviews:product.reviews,
    })
    
})

// Delete Review /api/v1/product/admin/deletREview

export const deleteReview = asyncHandler(async (req, res, next) => {
    const { productId, reviewId } = req.query;  // Assuming reviewId is passed in query params

    const product = await productModel.findById(productId);

    if (!product) {
        return next(new errorHandler("Product not found", 404));
    }

    // Check if the review exists
    const reviewIndex = product.reviews.findIndex(
        (r) => r._id.toString() === reviewId.toString() || r.user.toString() === req.user._id.toString()
    );

    if (reviewIndex === -1) {
        return next(new errorHandler("Review not found", 404));
    }

    // Remove the review from the product's reviews array
    product.reviews.splice(reviewIndex, 1);

    // Recalculate the number of reviews
    product.num_of_reviews = product.reviews.length;

    // Recalculate the product's overall rating
    if (product.reviews.length === 0) {
        product.rating = 0;  // If no reviews remain, reset the rating
    } else {
        product.rating =
            product.reviews.reduce((acc, item) => item.rating + acc, 0) /
            product.reviews.length;
    }

    // Save the product
    await product.save({ validateBeforeSave: false });

    res.status(200).json({
        success: true,
        message: "Review deleted successfully",
    });
});

// can user review the product =>/api/v1/product/canUserReview

export const canUserReview=asyncHandler(async(req,res)=>{
    const orders=await orderModel.find({
        user:req.user._id,
        "orderedItems.product":req.query.productId,
    });

    if(orders.length === 0){
        return res.status(200).json({ canReviewed: false});
    }

    res.status(200).json({
        canReviewed: true,
    });
});


// export const deleteReview = asyncHandler(async (req, res, next) => {
  
//     let product = await productModel.findById(req.query.productId);

//     if (!product) {
//         return next(new errorHandler("Product not found", 400));
//     }

//     // Check if the user has already reviewed the product
//     product.reviews = product?.reviews?.filter(
//         (review) => review._id.toString() !== req?.query?.id.toString()
//     );
//  product.num_of_reviews=product.reviews.length

//     // Update product's overall rating
//     product.rating =
//         product.reviews.reduce((acc, item) => item.rating + acc, 0) /
//         product.reviews.length

//     await product.save({ validateBeforeSave: false });

//     res.status(200).json({
//         success: true,
//     });
// });



//                >>>>>>>>>>>>>>>>>>>>>> SELLER <<<<<<<<<<<<<<<<<<<<<<<<<<<

// Create product by seller api/v1/product/seller/createProductBySeller


export const createProductBySeller=asyncHandler(async(req,res)=>{

    req.body.user=req.user._id  //assign the 'user' of productModel  to the id of current user who initiate the request

    const newProduct=await productModel.create(req.body);


    res.status(200).json({message:'new product has been created',newProduct,})
})

// Update product by seller api/v1/product/seller/updateProductBySeller


export const updateProductBySeller=asyncHandler(async(req,res,next)=>{

    let product=await productModel.findById(req.params.id);

    if(!product){
        return next(new errorHandler("product not found",400))
       
    }
    //check if the loggedin user is the owner of the product

    if(product.user.toString() !=req.user._id.toString() && req.user.role != 'admin'){
        return next(new errorHandler("Not authorized to update this product", 403))
    }
    //update the product

    const updatedProduct=await productModel.findByIdAndUpdate(req.params.id,req.body,{new:true})


    res.status(200).json({message:"product updated by seller",updatedProduct,})
})


// Seller deletes their own product

export const deleteProductBySeller = asyncHandler(async (req, res, next) => {

    
    const product = await productModel.findById(req.params.id);

    if (!product) {
        return next(new errorHandler("Product not found", 404));
    }

    // Check if the logged-in user is the owner of the product
    if (product.user.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
        return next(new errorHandler("Not authorized to delete this product", 403));
    }

    // Delete the product
    await product.deleteOne();

    res.status(200).json({ message: 'The product has been deleted successfully' });
});

// Get all products created by the logged-in seller

export const getProductsBySeller = asyncHandler(async (req, res, next) => {
    
    
    if (req.user.role !== 'seller') {
        return next(new errorHandler("Only sellers can access their products", 403));
    }

    // Find all products created by the logged-in user
    const products = await productModel.find({ user: req.user._id });

    // Check if products are found
    if (products.length === 0) {
        return next(new errorHandler("No products found for this seller", 404));
    }

    res.status(200).json({ success: true, products });
});