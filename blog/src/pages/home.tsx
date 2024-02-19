import Footer from "../components/footer";
import Hamburger from "../components/hamburger";
import Blogs from "../components/blog";
import { useEffect, useState } from "react";
import axios from "axios";

const Home = () => {

    const [blogs, setBlogs] = useState([]);
    const [count, setCount] = useState(0);

    const gotBlogs = async () => {
        try {
            const { data }: { data: any } = await axios.get(`${import.meta.env.VITE_BASE_URL}/blog/all`);
            setBlogs(data.blogs);
            setCount(data.count);
        } catch (error: any) {
            console.log(error);
        }
    }

    useEffect(() => {
        gotBlogs();
    }, []);
    
    return (
        <div>
            <Hamburger />
            {count}
            <Blogs blogs={blogs} />
            <Footer />
        </div>
    )
}

export default Home;