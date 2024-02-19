import { useEffect, useState } from "react";
import Arunav from "../components/arunav";
import Footer from "../components/footer";
import { useSearchParams } from "react-router-dom";
import axios from "axios";

const Blog = () => {

    const [search] = useSearchParams();
    const id = search.get("id");

    const [blog, setBlog] = useState<any>({});

    const gotBlog = async () => {
        if (id) {
            try {
                const { data }: { data: any } = await axios.get(`${import.meta.env.VITE_BASE_URL}/blog/view/${id}`);
                setBlog(data.blog);
            } catch (error: any) {
                console.log(error);
            }
        }
    }

    useEffect(() => {
        gotBlog();
    }, []);

    return (
        <div>
            {blog ? (
                <>
                    <Arunav blog={blog} />
                    <Footer />
                </>
            ) : (
                <div>Loading...</div>
            )}
        </div>
    )
}

export default Blog;