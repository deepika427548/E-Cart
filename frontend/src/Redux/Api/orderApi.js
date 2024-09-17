import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const orderApi = createApi({
    reducerPath: 'orderApi',
    baseQuery: fetchBaseQuery({ baseUrl: '/api/v1' }),
    tagTypes:['Order','AdminOrder'],
    endpoints: (builder) => ({
     
        createNewOrder: builder.mutation({
        query(body){
            return{
                url:"/order/createNewOrder",
                method:"POST",
                body,
            }
        }
      }),
      myOrders: builder.query({
       query:()=>`/order/myOrder`
      }),
      orderDetails: builder.query({
        query:(id)=>`/order/getOrderDetails/${id}`,
        providesTags:["Order"]
       }),
       getAllOrders: builder.query({
        query:()=>`/order/admin/getAllOrders`,
        providesTags:['AdminOrder']
       }),
       updateOrder: builder.mutation({
        query({id,body}){
            return{
                url:`/order/admin/updateOrder/${id}`,
                method:"PUT",
                body,
            }
      
        },
        invalidatesTags:["Order","AdminOrder"]
      }),
      deleteOrder: builder.mutation({
        query(id){
            return{
                url:`/order/admin/deleteOrder/${id}`,
                method:"DELETE",
    
            }
      
        },
        invalidatesTags:["Order","AdminOrder"]
      }),
      stripeCheckoutSession: builder.mutation({
        query(body){
            return{
                url:"/payment/checkout_session",
                method:"POST",
                body,
            }
        }
      }),
    }),
  })

  export const {useDeleteOrderMutation,useUpdateOrderMutation, useGetAllOrdersQuery,useCreateNewOrderMutation ,useStripeCheckoutSessionMutation,useMyOrdersQuery,useOrderDetailsQuery} = orderApi;