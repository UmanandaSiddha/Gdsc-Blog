import { useLocation, useNavigate } from "react-router-dom";
import { Blog } from "../types/types";
import { BlogResponse } from "../types/api-types";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { blogExist, blogNotExist } from "../redux/reducer/blogReducer";
import parse from "html-react-parser";
import { toast } from "react-toastify";

const AdminDetails = () => {

    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const userData = location.state;
    const [selectedFruit, setSelectedFruit] = useState(userData ? userData.role : 'user');
    const [verifyLoading, setVerifyLoading] = useState<boolean>(false);
    const [deleteLoading, setDeleteLoading] = useState<boolean>(false);

    const { blogs } = useSelector(
        (state: RootState) => state.blogReducer
    );

    const { user } = useSelector(
        (state: RootState) => state.userReducer
    );

    const gotBlogs = async () => {
        try {
            const { data }: { data: BlogResponse } = await axios.get(`${import.meta.env.VITE_BASE_URL}/blog/admin/${userData._id}`, { withCredentials: true });
            dispatch(blogExist(data.blogs));
        } catch (error: any) {
            dispatch(blogNotExist());
            console.log(error);
            toast.error(error.response.data.message);
        }
    }

    useEffect(() => {
        gotBlogs();
    }, []);

    const handleRole = async () => {
        setVerifyLoading(true);
        try {
            const { data }: { data: any } = await axios.put(`${import.meta.env.VITE_BASE_URL}/user/admin/user/${userData._id}`, { role: selectedFruit },  { withCredentials: true });
            toast.success(data.message);
        } catch (error: any) {
            toast.error(error.response.data.message);
        }
        setVerifyLoading(false);
    }

    const handleDelete = async (id: any) => {
        setDeleteLoading(true);
        try {
            const { data }: { data: any } = await axios.delete(`${import.meta.env.VITE_BASE_URL}/blog/edit/${id}`, { withCredentials: true });
            toast.success(data.message);
        } catch (error: any) {
            toast.error(error.response.data.message);
        }
        setDeleteLoading(false);
    }

    return (
        <div>
            <main>
                <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
                    <p className="text-2xl font-semibold">User Details</p>
                    {userData ? (
                        <>
                            <div className="flex flex-col justify-center items-center space-y-4">
                                <p>User Details:</p>
                                <p>{userData.name}</p>
                                <p>{userData.email}</p>
                                <div className="flex gap-2">
                                    {(user?._id !== userData._id) && (
                                        <>
                                            <select
                                                value={selectedFruit}
                                                onChange={(e) => setSelectedFruit(e.target.value)}
                                            >
                                                <option value="user">user</option>
                                                <option value="admin">admin</option>
                                                <option value="creator">creator</option>
                                            </select>
                                            <button onClick={handleRole} className="bg-slate-500 text-white px-3 py-1.5 rounded-lg" disabled={(selectedFruit === userData.role) || (verifyLoading)}>
                                                {verifyLoading ? "Updating..." : "Update Role"}
                                            </button>
                                        </>
                                    )}
                                </div>
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
                                                <button onClick={() => handleDelete(blog._id)!} disabled={deleteLoading} className="bg-red-500 text-white px-3 py-1.5 rounded-lg">
                                                    {deleteLoading ? "Deleting..." : "Delete"}
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
                        </>
                    ) : (
                        <div>
                            Unauthorized Navigation
                        </div>
                    )}
                </div>
            </main>
        </div>
    )
}

export default AdminDetails;