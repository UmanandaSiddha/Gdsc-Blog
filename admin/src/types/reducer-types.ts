import { Blog, User } from "./types";

export interface UserReducerInitialState {
    user: User | null;
    loading: boolean;
}

export interface BlogReducerInitialState {
    blogs: Blog[];
    blog: Blog | null;
    loading: boolean;
}


