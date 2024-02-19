import "../styles/home.css";

const Footer = () => {
    return (
        <div id="footer">
            <div id="quicklinks">
                <h3>Quick Links</h3>
                <a href="https://gdsc.community.dev/chapters/" target="_blank"><li>Chapters</li></a>
                <a href="https://gdsc.community.dev/events/#/list" target="_blank"><li>Upcoming events</li></a>
                <a href="https://developers.google.com/community/gdsc" target="_blank"><li>About GDSC</li></a>
                <a href="https://gdsc.community.dev/participation-terms/" target="_blank"><li>Participation Terms</li></a>
                <a href="https://policies.google.com/privacy" target="_blank"><li>Privacy</li></a>
                <a href="https://policies.google.com/terms" target="_blank"><li>Terms</li></a>
            </div>
            <div id="socialf">
                Socials
                <div className="socialelem">
                    <a href="https://in.linkedin.com/company/gdsc-tezpur-university" target="_blank"><img src="/linkedin_footer.svg" alt="linkedin logo" /></a>
                    <a href="https://twitter.com/gdsc_tezu" target="_blank"><img src="/x_footer.svg" alt="x logo" /></a>
                    <a href="https://m.facebook.com/profile.php?id=61550245499884&locale=en_GB&_rdr" target="_blank"><img src="/meta_footer.svg" alt="meta logo" /></a>
                    <a href="https://www.instagram.com/gdsc_tezu/" target="_blank"><img src="instagram_footer.svg" alt="instagram logo" /></a>
                </div>
            </div>
            <div id="team">
                <p>MADE BY- <br />NILKAMAL SARMA  <br /> ARUNAV SAHA  <br />UMANANDA SIDDHA</p>
            </div>
        </div>
    )
}

export default Footer;