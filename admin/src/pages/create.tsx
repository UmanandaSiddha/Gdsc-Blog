import axios from "axios";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Create = () => {

    const location = useLocation();
    const navigate = useNavigate();
    const blogsData = location.state;

    const [title, setTitle] = useState<string | undefined>(blogsData?.blogTitle ? blogsData.blogTitle : "");
    const [description, setDescription] = useState<string | undefined>("");
    const [image, setImage] = useState<any>();
    const [content, setContent] = useState<string | undefined>(blogsData?.blogContent ? blogsData.blogContent : "");
    const [verifyLoading, setVerifyLoading] = useState<boolean>(false);

    const registerDataChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const reader = new FileReader();
        reader.onload = () => {
            if (reader.readyState === 2) {
                setImage(reader.result)
            }
        };
        reader.readAsDataURL(e.target.files![0]);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setVerifyLoading(true);

        const blogData = {
            title,
            description,
            image,
            content
        }

        try {
            if (blogsData?.blogId) {
                const config = { headers: { "Content-Type": "application/json" }, withCredentials: true };
                const { data }: { data: any } = await axios.put(`${import.meta.env.VITE_BASE_URL}/blog/edit/${blogsData?.blogId}`, blogData, config);
                console.log(data)
            } else {
                const config = { headers: { "Content-Type": "application/json" }, withCredentials: true };
                const { data }: { data: any } = await axios.post(`${import.meta.env.VITE_BASE_URL}/blog/new`, blogData, config);
                console.log(data)
            }
            toast.success("Blog Created!");
            navigate("/profile");
        } catch (error: any) {
            toast.error(error.response.data.message);
        }

        setVerifyLoading(false);
    }

    return (
        <main>
            <div className="max-w-7xl mx-6 py-6 sm:px-6 md:px-6 lg:px-8">
                <form onSubmit={handleSubmit}>
                    <div className="space-y-12">
                        <div className="border-b border-gray-900/10 pb-12">
                            <h2 className="text-base font-semibold leading-7 text-gray-900">Create Your Blog Here</h2>
                            <p className="mt-1 text-sm leading-6 text-gray-600">
                                Bigger screen is suggested for writing blog.
                            </p>

                            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                <div className="sm:col-span-4">
                                    <label htmlFor="title" className="block text-sm font-medium leading-6 text-gray-900">
                                        Title
                                    </label>
                                    <div className="mt-2">
                                        <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                            <input
                                                type="text"
                                                name="title"
                                                value={title}
                                                onChange={(e) => setTitle(e.target.value)}
                                                className="block flex-1 border-0 bg-transparent px-1.5 py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                                placeholder="Enter Your Blog Title"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="col-span-full">
                                    <label htmlFor="description" className="block text-sm font-medium leading-6 text-gray-900">
                                        Description
                                    </label>
                                    <div className="mt-2">
                                        <textarea
                                            name="description"
                                            rows={2}
                                            value={description}
                                            onChange={(e) => setDescription(e.target.value)}
                                            className="block w-full rounded-md border-0 px-1.5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                    <p className="mt-3 text-sm leading-6 text-gray-600">Write a few sentences about yourself.</p>
                                </div>

                                <div className="sm:col-span-4">
                                    <label htmlFor="image" className="block text-sm font-medium leading-6 text-gray-900">
                                        Image
                                    </label>
                                    <div className="mt-2">
                                        <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                            <input
                                                type="file"
                                                name="image"
                                                accept="image/*"
                                                onChange={registerDataChange}
                                                className="block flex-1 border-0 bg-transparent px-1.5 py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                                placeholder="Enter Your Blog Title"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="col-span-full">
                                    <a href="https://tip-tap-rich-text-editor.vercel.app/" target="blank" className="mt-1 text-sm leading-6 text-gray-600">
                                        Click here ( https://tip-tap-rich-text-editor.vercel.app ) to create the blog content and paste it in the content section.
                                    </a>
                                    <label htmlFor="content" className="block text-sm font-medium leading-6 text-gray-900">
                                        Content
                                    </label>
                                    <div className="mt-2">
                                        <textarea
                                            name="content"
                                            rows={3}
                                            value={content}
                                            onChange={(e) => setContent(e.target.value)}
                                            className="block w-full rounded-md border-0 px-1.5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                    <p className="mt-3 text-sm leading-6 text-gray-600">Write a few sentences about yourself.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-6 flex items-center justify-end gap-x-6">
                        <button type="button" onClick={() => navigate(-1)} className="text-sm font-semibold leading-6 text-gray-900">
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={verifyLoading}
                            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            {verifyLoading ? (
                                <div>
                                    {blogsData?.blogId ? "Updating..." : "Saving..."}
                                </div>
                            ) : (
                                <div>
                                    {blogsData?.blogId ? "Update" : "Save"}
                                </div>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </main>
    )
}

export default Create;