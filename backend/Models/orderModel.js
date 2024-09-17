import mongoose from "mongoose";

const orderSchema=new mongoose.Schema({

    shippingInfo:{
        address:{
            type:String,
            required:true
        },
        city:{
            type:String,
            required:true
        },
        phoneNo:{
            type:String,
            required:true
        },
        zipcode:{
            type:String,
            required:true
        },
        country:{
            type:String,
            required:true
        },
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'User',
    },
    orderedItems:[
        {
            name:{
                type:String,
                required:true,
            },
            quantity:{
                type:Number,
                required:true,
            },
            image:{
                type:String,
                required:true,
            },
            price:{
                type:Number,
                required:true,
            },
          
            product:{
                type:mongoose.Schema.Types.ObjectId,
                required:true,
                ref:'productModel',
            },
        },
    ],

    paymentMethod:{
        type:String,
        required:[true,"Please select Payment Method"],
        enum:{
           values:['COD','Card'],
           message:"please select COD or Card"
        },
    },

    paymentInfo:{
        id:String,
        status:String,
    },
    itemsPrice:{
        type:Number,
        required:true,
    },
    taxAmount:{
        type:Number,
        required:true,
    },
    shippingAmount:{
        type:Number,
        required:true,
    },
    totalAmount:{
        type:Number,
        required:true,
    },
    orderStatus:{
        type:String,
        enum:{
            values:['Processing','Delivered','Shipped'],
            message:"please select correct order status"
         },

        default:'Processing'
    },
    deliveredAt:Date

},
{timestamps:true})

const orderModel=mongoose.model("Order",orderSchema);

export default orderModel;