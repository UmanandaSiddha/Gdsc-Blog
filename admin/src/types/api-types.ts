import { Blog, User } from "./types";

export type UserResponse = {
    success: boolean;
    user: User;
};

export type BlogResponse = {
    success: boolean;
    count: number;
    blogs: Blog[];
}

export type SingleTreeResponse = {
    success: boolean;
    blog: Blog;
}