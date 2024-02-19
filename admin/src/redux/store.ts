import { configureStore } from '@reduxjs/toolkit';
import { userReducer } from "./reducer/userReducer";
import { blogReducer } from './reducer/blogReducer';

export const store = configureStore({
    reducer: {
        [userReducer.name]: userReducer.reducer,
        [blogReducer.name]: blogReducer.reducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;