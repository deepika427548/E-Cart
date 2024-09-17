import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const productApi = createApi({
    reducerPath: 'ProductApi',
    baseQuery: fetchBaseQuery({ baseUrl: '/api/v1/product' }),
    tagTypes:["Product","AdminProducts","SellerProducts"],
    endpoints: (builder) => ({
      getAllProducts: builder.query({
        query: (params) =>({url:"/getAllProducts",
          params:{
            page:params?.page,
            keyword:params?.keyword,
            category:params?.category,
            "price[gte]":params.min,
            "price[lte]":params.max,
            "rating[gte]":params?.ratings,

          },

        }),
      }),
      getProductById: builder.query({
        query: (id) =>`/getProductById/${id}`,
        providedTags:["Product"],
      }),
      createReview: builder.mutation({
        query(body){
            return{
                url:"/createReview",
                method:"PUT",
                body,
            }
        },
        invalidatesTags:["Product"]
      }),
      canUserReview: builder.query({
        query: (productId) =>`/canUserReview/?productId=${productId}`,
      }),

      // >>>>>>>>>>>>>>>>>>>>>>ADMIN<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
      getProductsByAdmin: builder.query({
        query: () =>`/admin/getProductsByAdmin`,
        providedTags:["AdminProducts"],
      }),
      createProductByAdmin:builder.mutation({
     query(body){
      return{
        url:"/admin/addProduct",
        method:"POST",
        body,
      }
     },
     invalidatesTags:["AdminProducts","Product"],
      }),
      updateProduct:builder.mutation({
        query({id,body}){
         return{
           url:`/admin/updateProduct/${id}`,
           method:"PUT",
           body,
         }
        },
        invalidatesTags:["Product","AdminProducts"]
         }),
         uploadImages:builder.mutation({
          query({id,body}){
           return{
             url:`/admin/uploadImages/${id}`,
             method:"PUT",
             body,
           }
          },
          invalidatesTags:["Product"]
           }),
           deleteImage:builder.mutation({
            query({id,body}){
             return{
               url:`/admin/deleteImage/${id}`,
               method:"PUT",
               body,
             }
            },
            invalidatesTags:["Product"]
             }),
             deleteProduct:builder.mutation({
              query(id){
               return{
                 url:`/admin/deleteProduct/${id}`,
                 method:"DELETE",
                 
               }
              },
              invalidatesTags:["AdminProducts","Product"]
               }),

      // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>SELLER>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
      getProductsBySeller: builder.query({
        query: () =>`/seller/getProductsBySeller`,
        providedTags:["SellerProducts"],
      }),
      createProductBySeller:builder.mutation({
        query(body){
         return{
           url:"/seller/createProductBySeller",
           method:"POST",
           body,
         }
        },
        invalidatesTags:["SellerProducts"]
         }),
         updateProductBySeller:builder.mutation({
          query({id,body}){
           return{
             url:`/seller/updateProductBySeller/${id}`,
             method:"PUT",
             body,
           }
          },
          invalidatesTags:["SellerProducts","Products"]
           }),
    }),
  })

  export const {useCanUserReviewQuery,
    useCreateReviewMutation, 
    useDeleteImageMutation,
    useUploadImagesMutation,
    useUpdateProductBySellerMutation,
    useUpdateProductMutation,
    useCreateProductBySellerMutation,
    useCreateProductByAdminMutation,
    useGetAllProductsQuery,
    useGetProductByIdQuery,
    useGetProductsByAdminQuery,
    useGetProductsBySellerQuery,
  useDeleteProductMutation} = productApi;