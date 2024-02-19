import { useNavigate } from "react-router-dom";
import "../styles/home.css";
import moment from "moment";

const Blogs = ({ blogs }: any) => {

    const navigate = useNavigate();

    return (
        <div>
            {blogs.map((blog: any) => (
                <div onClick={() => navigate(`/view?id=${blog._id}`)} key={blog._id} className="content">
                    <img src={blog.image} id='blogimg1' alt={blog.title} />
                    <div id="blog">
                        <div className="writing">
                            <p>{blog.user.name} | {moment(blog.createdAt).format('MM/DD/YYYY')}</p>
                            <h2>{blog.title}</h2>
                            <p>{blog.description}</p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default Blogs;