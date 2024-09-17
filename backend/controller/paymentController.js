import asyncHandler from "../middlewares/asyncHandler.js";
import Stripe from 'stripe';

import dotenv from 'dotenv';
import orderModel from "../Models/orderModel.js";
dotenv.config({path:'./config/config.env'});

const stripe=Stripe(process.env.STRIPE_SECRET_KEY);


//Create stripe checkout payment /api/v1/payment/checkout_session
   

export const stripeCheckoutSession=asyncHandler(async(req,res,next)=>{
   
    const body=req?.body;
    


const line_items=body?.orderedItems?.map((item)=>{
    return{
        price_data:{
            currency:"inr",
            product_data:{
                name:item?.name,
                images:[item?.image],
                metadata:{productId:item?.product},

            },
            unit_amount:item?.price *100
        },
        tax_rates:["txr_1PvvJeEK1D5EbVi2PsuIkd4K"],
        quantity:item?.quantity,
    }
});


const shippingInfo = body?.shippingInfo;
const shipping_rate=body?.itemsPrice>=200 ? "shr_1PvuuxEK1D5EbVi2RZD3Wb71" :"shr_1Pvuw8EK1D5EbVi2tjeN68vW"

    const session=await stripe.checkout.sessions.create({
        payment_method_types:["card"],
        success_url:`${process.env.FRONEND_URL}/me/orders?order_success=true`,
        cancel_url:`${process.env.FRONEND_URL}`,
        customer_email:req?.user?.email,
        client_reference_id:req?.user?._id?.toString(),
        mode:"payment",
        metadata:{...shippingInfo,itemsPrice:body?.itemsPrice},
        shipping_options:[{
            shipping_rate,
        },],
        line_items,

    })
    // console.log(session);
    

    res.status(200).json({url:session.url})

})

const getOrderItems=async(line_items)=>{
    return new Promise((resolve,reject)=>{
        let cartItems=[];

        line_items?.data?.forEach(async(item)=>{
            const product=await stripe.products.retrieve(item.price.product);
            const productId=product.metadata.productId

            console.log("=========================");
            console.log("item",item);
            console.log("=========================");
            console.log("product",product);


        cartItems.push({
            product:productId,
            name:product.name,
            price:item.price.unit_amount_decimal /100 ,
            quantity:item.quantity,
            image:product.images[0],

        })
        if(cartItems.length===line_items?.data?.length){
resolve(cartItems);
        }
        })
    })
}



export const stripe_webhook=asyncHandler(async(req,res,next)=>{
    try {
      
     
        const signature=req.headers["stripe-signature"];

        const event=stripe.webhooks.constructEvent(
            req.rawBody,
            signature,
            process.env.STRIPE_WEBHOOK_KEY
        );

        if(event.type=== "checkout.session.completed"){
            const session=event.data.object;
            const line_items=await stripe.checkout.sessions.listLineItems(
                session.id
            );
            

            const orderedItems=await getOrderItems(line_items);
            const user=session.client_reference_id;

            const totalAmount=session.amount_total  / 100;
            const taxAmount=session.total_details.amount_tax /100;
            const shippingAmount=session.total_details.amount_shipping /100;
            const itemsPrice=session.metadata.itemsPrice;

            const shippingInfo={
                address:session.metadata.address,
                city:session.metadata.city,
                phoneNo:session.metadata.phoneNo,
                zipcode:session.metadata.zipcode,
                country:session.metadata.country,
             };

             const paymentInfo={
                id:session.payment_intent,
                status:session.payment_status,
             }

             const orderedData={
                shippingInfo,
                orderedItems,
                itemsPrice,
                taxAmount,
                shippingAmount,
                totalAmount,
                paymentInfo,
                paymentMethod:"Card",
                user,
             }
        
             await orderModel.create(orderedData)
            

            res.status(200).json({success:true});
            
        }



        
    } catch (error) {
        console.log("==================================");
        console.log("Error-->",error);
        console.log("==================================");
    }
})



