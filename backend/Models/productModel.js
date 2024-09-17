import mongoose from "mongoose";

const ProductSchema=new mongoose.Schema({

    name:{
        type:String,
        required:[true,'please Enter The Name'],
        maxlength:[200,'product name cannot exeed 200']
    },    
    price:{
        type:Number,
        required:[true,'please Enter The price of the product'],
        maxlength:[5,'product name cannot exeed more than 5']
    },
    description:{
        type:String,
        required:[true,'please Enter product description'],

    },
    rating:{
        type:Number,
        default:0
    },
    images:[ { 
       public_id:{  // cloudinary use to save images
        type:String,
        required:true
       },
       url:{
        type:String,
        required:true
           }
            }
          ],

   category:{
    type:String,
    required:[true,'please Enter product category'],
    enum:{
        values:[
            'Electronics',
            'Laptop',
            'Camera',
            'Accessories',
            'Headphones',
            'Food',
            'Book',
            'Sport',
            'Home',
            'Outdoor',
            "Mens Clothing",
            "Womens Clothing",
            'Footwear',
            'Bags'

        ]
    }
   },

   seller:{
    type:String,
    required:[true,'please Enter the seller Name']
   },

   stock:{
    type:Number,
    required:[true,'please Enter the stock number']
   },

   num_of_reviews:{
    type:Number,
    default:0
   },

   reviews:[
    {
        user:{
            type:mongoose.Schema.Types.ObjectId, // user that ctreates reviews
            ref:'User',
            required:true
        },
        rating:{
            type:Number,
            required:true
        },
        comment:{
            type:String,
            required:true
        }
    }
   ],
   user:{
    type:mongoose.Schema.Types.ObjectId,  // User that creates products
    ref:'User',
    required:true
   },

},
{timestamps:true}
)

const productModel=mongoose.model("Product",ProductSchema);

export default productModel;

