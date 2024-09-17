import express from "express"
import { authoriseRoles, isAuthenticatedUser } from "../../middlewares/auth.js";
import { createNewOrder, deleteOrder, getAllOrders, getOrderDetails, MyOrder, updateOrder } from "../../controller/orderController.js";

const orderRouter=express.Router();


orderRouter.post('/createNewOrder',isAuthenticatedUser,createNewOrder)
orderRouter.get('/getOrderDetails/:id',isAuthenticatedUser,getOrderDetails)
orderRouter.get('/myOrder',isAuthenticatedUser,MyOrder)

orderRouter.get('/admin/getAllOrders',isAuthenticatedUser,authoriseRoles('admin'),getAllOrders)
orderRouter.put('/admin/updateOrder/:id',isAuthenticatedUser,authoriseRoles('admin'),updateOrder)
orderRouter.delete('/admin/deleteOrder/:id',isAuthenticatedUser,authoriseRoles('admin'),deleteOrder)

export default orderRouter;
