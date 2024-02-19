export type User = {
    name: string;
    email: string;
    role: string;
    _id: string;
    isVerified: boolean;
};

export type Blog = {
    title: string;
    _id: string;
    image: string;
    content: string;
    user: string;
}