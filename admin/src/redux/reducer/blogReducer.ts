import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { BlogReducerInitialState } from "../../types/reducer-types";
import { Blog } from "../../types/types";

const initialState: BlogReducerInitialState = {
    blogs: [],
    blog: null,
    loading: true,
};

export const blogReducer = createSlice({
    name: "blogReducer",
    initialState,
    reducers: {
        blogExist: (state, action: PayloadAction<Blog[]>) => {
            state.loading = false;
            state.blogs = action.payload;
        },
        blogTemp: (state, action: PayloadAction<Blog>) => {
            state.loading = false;
            state.blog = action.payload;
        },
        blogNotTemp: (state) => {
            state.loading = false;
            state.blog = null;
        },
        blogNotExist: (state) => {
            state.loading = false;
            state.blogs = [];
        },
    },
});

export const { blogExist, blogNotExist, blogTemp, blogNotTemp } = blogReducer.actions;