import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { userApi } from './userApi';

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({ baseUrl: '/api/v1/user' }),
    endpoints: (builder) => ({
        signup:builder.mutation({
            query(body){
                return{
                    url:"/signupUser",
                    method:"POST",
                    body,
                }
            },
        }),
    login:builder.mutation({
        query(body){
            return{
                url:"/loginUser",
                method:"POST",
                body,
            }
        },
        async onQueryStarted(args,{dispatch,queryFulfilled}){
            try {
                await queryFulfilled;
                await dispatch(userApi.endpoints.getUserProfile.initiate(null))
            } catch (error) {
                console.log(error);
                
            }
        }

    }),

    logout:builder.mutation({
query:()=>'/logoutUser',
async onQueryStarted(args, { dispatch, queryFulfilled }) {
    try {
      await queryFulfilled;
      // Optionally, you can dispatch actions to clear user data
      dispatch(userApi.endpoints.getUserProfile.initiate(null)); // Optional: Refetch or clear user profile data
    } catch (error) {
      console.error('Logout Error:', error);
    }
  },

    }),
    }),
  });

  export const { useLoginMutation,useSignupMutation,useLogoutMutation} = authApi;