import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

type login = {
  email: string;
  password: string;
};
type register = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  avatar: string;
};

type upload = {
  imageData: number[];
  imageType: string;
  imageName: string;
};

export const API = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000/api/v1/",
    credentials: "include",
  }),
  endpoints: (builder) => ({
    login: builder.mutation<unknown, login>({
      query: (payload) => ({
        url: "auth/login",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: payload,
      }),
    }),
    register: builder.mutation<unknown, register>({
      query: (payload) => ({
        url: "auth/register",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: payload,
      }),
    }),
    logout: builder.mutation<unknown, void>({
      query: () => ({
        url: "auth/logout",
        method: "POST",
      }),
    }),
    upload: builder.mutation<{ message: string; url?: string }, upload>({
      query: (payload) => ({
        url: "upload/img ",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: payload,
      }),
    }),
    getMe: builder.query({
      query: () => "auth/getMe",
    }),
    createPost: builder.mutation({
      query: (payload) => ({
        url: "posts/create",
        method: "POST",
        body: payload,
      }),
    }),
    getAllAdminPosts: builder.query({
      query: () => "admin/posts",
    }),
    getAllPosts: builder.query({
      query: () => "posts/",
    }),
    singlePost: builder.query({
      query: ({ id }) => `posts/${id}`,
    }),
    randomImage: builder.query({
      query: () => "posts/randomImage",
    }),
    //Start with Profiles
    getProfile: builder.query({
      query: ({ id }) => `profile/${id}`,
    }),
    editProfile: builder.mutation({
      query: (payload) => ({
        url: "profile/edit/" + payload.id,
        method: "PATCH",
        body: payload,
      }),
    }),
    //for  Admins
    aprovePosts: builder.mutation({
      query: (payload) => ({
        url: "admin/posts/edit/" + payload.id,
        method: "PATCH",
        body: payload,
      }),
    }),
    deletePost: builder.mutation({
      query: (payload) => ({
        url: "admin/posts/delete/" + payload.id,
        method: "DELETE",
      }),
    }),
    getAllUsers: builder.query({
      query: () => "admin/users",
    }),
    getProfileById: builder.query({
      query: ({ id }) => `admin/users/${id}`,
    }),
    banUser: builder.mutation({
      query: ({ id, action }) => ({
        url: "admin/users/ban/" + id,
        method: "PATCH",
        body: { action: action },
      }),
    }),
    editUserByAdmin: builder.mutation({
      query: ({ payload, id }) => ({
        url:"admin/users/editByAdmin/" + id,
        method:"PATCH",
        body:payload

      })
    }),
    createUser: builder.mutation({
      query: (payload) => ({
        url: "admin/users/create",
        method: "POST",
        body: payload,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useUploadMutation,
  useLogoutMutation,
  useGetMeQuery,
  useLazyGetMeQuery,
  useCreatePostMutation,
  useGetAllPostsQuery,
  useSinglePostQuery,
  useRandomImageQuery,
  useLazyGetProfileQuery,
  useEditProfileMutation,
  useAprovePostsMutation,
  useDeletePostMutation,
  useLazyGetAllAdminPostsQuery,
  useLazyGetAllUsersQuery,
  useLazyGetProfileByIdQuery,
  useGetProfileByIdQuery,
  useBanUserMutation,
  useEditUserByAdminMutation,
  useCreateUserMutation,
} = API;
