import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { setIsAuthenticated, setLoading, setUser } from '../features/userSlice';


export const userApi = createApi({
    reducerPath: 'userApi',
    baseQuery: fetchBaseQuery({ baseUrl: '/api/v1/user' }),
    tagTypes:["User","AdminUsers","AdminUser"],
    endpoints: (builder) => ({
        getUserProfile:builder.query({
            query:()=>`/getUserProfile`,
            transformResponse:(result)=>result.user,
            async onQueryStarted(args,{dispatch,queryFulfilled}){
                try {
                    const{data}=await queryFulfilled;
                    dispatch(setUser(data))
                    dispatch(setIsAuthenticated(true))
                    dispatch(setLoading(false))
                } catch (error) {
                    dispatch(setLoading(false))
                    console.log(error);
                    
                }
            },
            providesTags:['User'] //to refetch the data
        }),
        updateProfile:builder.mutation({
            query(body){
                return{
                    url:"/updateUserProfile",
                    method:'PUT',
                    body,
                }
            },
invalidatesTags:["User"]
        }),
        uploadAvatar:builder.mutation({
            query(body){
                return{
                    url:"/uploadAvatar",
                    method:'PUT',
                    body,
                }
            },
invalidatesTags:["User"]
        }),
        updatePassword:builder.mutation({
            query(body){
                return{
                    url:"/updatePassword",
                    method:'PUT',
                    body,
                }
            },
        }),
        getAllUsers: builder.query({
            query:()=>`/admin/getAllUsers`,
            providesTags:['AdminUsers']
           }),
        getUserDetails: builder.query({
            query:(id)=>`/admin/getUserDetails/${id}`,
            providesTags:['AdminUser']
           }),
           updateUser:builder.mutation({
            query({id,body}){
                return{
                    url:`/admin/updateUser/${id}`,
                    method:'PUT',
                    body,
                }
            },
            invalidatesTags:['AdminUsers']
        }),
        deleteUser:builder.mutation({
            query(id){
                return{
                    url:`/admin/deleteUser/${id}`,
                    method:'DELETE',
            
                }
            },
            invalidatesTags:['AdminUsers']
        }),



    }),
  })

  export const { useDeleteUserMutation,useUpdateUserMutation,useGetUserDetailsQuery,useGetAllUsersQuery,useGetUserProfileQuery,useUpdateProfileMutation,useUploadAvatarMutation,useUpdatePasswordMutation} = userApi;