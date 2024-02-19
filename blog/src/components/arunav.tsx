import moment from "moment";
import "../styles/blog.css";
import "../styles/editor.css";
import parse from "html-react-parser";

const Arunav = ({ blog }: any) => {
    return (
        <div>
            <div className="nav_arr">
                <div className="nav_arr_top">
                    <div className="gdsc_arr_logo">
                        <img src="gdsclogo.svg" alt="" />
                    </div>
                    <div className="social_arr">
                        <a href="https://in.linkedin.com/company/gdsc-tezpur-university" target="_blank"><img src="linkedin.svg" alt="linkedin logo" /></a>
                        <a href="https://twitter.com/gdsc_tezu" target="_blank"><img src="x.svg" alt="x logo" /></a>
                        <a href="https://m.facebook.com/profile.php?id=61550245499884&locale=en_GB&_rdr" target="_blank"><img src="meta.svg" alt="meta logo" /></a>
                        <a href="https://www.instagram.com/gdsc_tezu/" target="_blank"><img src="instagram.svg" alt="instagram logo" /></a>
                    </div>
                </div>
                <div className="title_arr">
                    <h1>BINARY BARD</h1>
                </div>
                <div className="nav_arr_mid">
                    <span className="button_arr ribbon">
                        <div className="elemchild_arr">
                            <div className="line">|</div>
                            <div className="elem">
                                <h4><a href="#">HOME</a></h4>
                            </div>
                            <div className="line">|</div>
                            <div className="elem">
                                <h4><a href="#">BLOG</a></h4>
                            </div>
                            <div className="line">|</div>
                            <div className="elem">
                                <h4><a href="#">ABOUT</a></h4>
                            </div>
                            <div className="line">|</div>
                        </div>
                    </span>
                </div>
            </div>
            <div className="content_div_arr">
                <div className="title_arr2">{blog.title}</div>
                <div className="blog_info_arr" style={{fontSize: "20px"}}>{blog.description}</div>
                {/* <img className="content_img_arr" src="blogimg.jpg" alt="" /> */}
                <div className="user_info_arr">
                    <div className="date_arr_time" style={{fontSize: "20px"}}>{blog.user?.name} | {moment(blog.createdAt).format('MM/DD/YYYY')}</div>
                </div>
                <div className="blog_info_arr editor-blog">{parse(`${blog.content}`)}</div>
            </div>
        </div>
    )
}

export default Arunav;