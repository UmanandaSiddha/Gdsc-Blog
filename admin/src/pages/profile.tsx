import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import Loader from "../components/loader";
import axios from "axios";
import { useEffect, useState } from "react";
import { BlogResponse } from "../types/api-types";
import { blogExist, blogNotExist } from "../redux/reducer/blogReducer";
import { Blog } from "../types/types";
import { useNavigate } from "react-router-dom";
import parse from "html-react-parser";
import { toast } from "react-toastify";

const Profile = () => {

    const { user, loading } = useSelector(
        (state: RootState) => state.userReducer
    );

    const { blogs } = useSelector(
        (state: RootState) => state.blogReducer
    );

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [verifyLoading, setVerifyLoading] = useState<boolean>(false);

    const gotBlogs = async () => {
        try {
            const { data }: { data: BlogResponse } = await axios.get(`${import.meta.env.VITE_BASE_URL}/blog/my`, { withCredentials: true });
            dispatch(blogExist(data.blogs));
        } catch (error: any) {
            dispatch(blogNotExist());
            toast.error(error.response.data.message);
        }
    }

    useEffect(() => {
        gotBlogs();
    }, []);

    const handleDelete = async (id: any) => {
        setVerifyLoading(true);
        try {
            const { data }: { data: any } = await axios.delete(`${import.meta.env.VITE_BASE_URL}/blog/edit/${id}`, { withCredentials: true });
            toast.success(data.message);
        } catch (error: any) {
            toast.error(error.response.data.message);
        }
        setVerifyLoading(false);
    }

    return (
        <main>
            <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
                {loading ? (
                    <Loader />
                ) : (
                    <div>
                        <div className="flex flex-col justify-center items-center space-y-4">
                            <p>UserId: {user?._id}</p>
                            <p>Name : {user?.name}</p>
                            <p>Email: {user?.email}</p>
                        </div>

                        <div className="flex flex-col w-full gap-6">
                            {blogs.map((blog: Blog, index: number) => (
                                <div key={index} className="flex flex-wrap justify-evenly space-y-4 border-2 rounded-xl p-4 m-4" >
                                    <div className="flex w-[500px] flex-col justify-center items-center space-y-4">
                                        <p>{blog._id}</p>
                                        <p className="text-2xl font-semibold uppercase">{blog.title}</p>
                                        <div>{parse(blog.content.length > 200 ? `${blog.content.substring(0, 200)}.....` : blog.content)}</div>
                                        <div className="flex gap-4">
                                            <button className="bg-blue-500 text-white px-3 py-1.5 rounded-lg">View</button>
                                            <button onClick={() => handleDelete(blog._id)!} disabled={verifyLoading} className="bg-red-500 text-white px-3 py-1.5 rounded-lg">
                                                {verifyLoading ? "Deleting..." : "Delete"}
                                            </button>
                                            <button onClick={() => navigate("/create", {
                                                state : {
                                                    blogTitle: blog.title,
                                                    blogId: blog._id,
                                                    blogContent: blog.content
                                                }
                                            })} className="bg-green-400 text-white px-3 py-1.5 rounded-lg">Update</button>
                                        </div>
                                    </div>
                                    <div>
                                        <img src={blog.image} alt={blog.title} className="h-[200px] w-[200px] rounded-xl" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </main>
    )
}

export default Profile;