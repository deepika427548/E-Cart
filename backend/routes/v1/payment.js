import express from "express"
import { isAuthenticatedUser } from "../../middlewares/auth.js";
import { stripe_webhook, stripeCheckoutSession } from "../../controller/paymentController.js";

const PaymentRouter=express.Router();


 PaymentRouter.post("/checkout_session",isAuthenticatedUser,stripeCheckoutSession)
 PaymentRouter.post("/webhook",stripe_webhook)


export default PaymentRouter;

