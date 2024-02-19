import { Menu } from 'lucide-react';
import { X } from 'lucide-react';
import "../styles/home.css";

const Hamburger = () => {
    return (
        <>
            <div className="hamburger-parent">
                <div className="hamburger">
                    <input type="checkbox" id="menuBtn" />
                    <div className="menu_overlay">
                        <label htmlFor="menuBtn">
                            <X className='fas' />
                        </label>
                        <div id="searchgrandparent-menu">
                            <div id="searchparent-menu">
                                <div id="search-menu">
                                    <form>
                                        <input type="text" placeholder="Search..." />
                                        <button type="submit"><img src="/search.svg" alt="" /></button>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <ul>
                            <li><a href="#">HOME</a></li>
                            <li><a href="#">ABOUT</a></li>
                            <li><a href="#">BLOG</a></li>
                            <li><a href="#">LOGIN</a></li>
                        </ul>
                        <div className="hamburger-social">
                            <a href="https://in.linkedin.com/company/gdsc-tezpur-university" target="_blank"><img src="/linkedin.svg" alt="linkedin logo" /></a>
                            <a href="https://twitter.com/gdsc_tezu" target="_blank"><img src="/x.svg" alt="x logo" /></a>
                            <a href="https://m.facebook.com/profile.php?id=61550245499884&locale=en_GB&_rdr" target="_blank"><img src="/meta.svg" alt="meta logo" /></a>
                            <a href="https://www.instagram.com/gdsc_tezu/" target="_blank"><img src="/instagram.svg" alt="instagram logo" /></a>
                        </div>
                    </div>
                    <div className="landing_page">
                        <div className="menu">
                            <label htmlFor="menuBtn">
                                <Menu />
                            </label>
                        </div>
                    </div>
                </div>
            </div>
            <div id="main">
                <div id="nav">
                    <div id="navtop">
                        <div id="elemparent">
                            <hr />
                            <div id="elemchild">
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
                                <div className="elem">
                                    <h4><a href="#">LOGIN</a></h4>
                                </div>
                                <div className="line">|</div>
                            </div>
                            <hr />
                        </div>
                        <div className="social">
                            <a href="https://in.linkedin.com/company/gdsc-tezpur-university" target="_blank"><img src="/linkedin.svg" alt="linkedin logo" /></a>
                            <a href="https://twitter.com/gdsc_tezu" target="_blank"><img src="/x.svg" alt="x logo" /></a>
                            <a href="https://m.facebook.com/profile.php?id=61550245499884&locale=en_GB&_rdr" target="_blank"><img src="/meta.svg" alt="meta logo" /></a>
                            <a href="https://www.instagram.com/gdsc_tezu/" target="_blank"><img src="/instagram.svg" alt="instagram logo" /></a>
                        </div>
                    </div>
                    <div id="background">
                        <div id="titleparent">
                            <div id="title">
                                <h1>BINARY BARD</h1>
                            </div>
                        </div>
                        <div id="searchgrandparent">
                            <div id="searchparent">
                                <div id="search">
                                    <form>
                                        <input type="text" placeholder="Search..." />
                                        <button type="submit"><img src="/search.svg" alt="" /></button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Hamburger