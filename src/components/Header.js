import {useMemo} from "react";
import './Main.css';
import './Contact.css';

function Header() {
    const location = useMemo(() => {
        return window.location.href;
    }, [window.location.href]);

    const logButtonHref = useMemo(() => {
        return location.includes("login") || location.includes("private-area")?
                window.location.href.replaceAll(/((private-area)|(login))(\/)*/g, "") :
                window.location.href + "login";
    }, [location]);

    const contactButtonHref = useMemo(() => {
        if(location.includes("contact")) {
            return window.location.href.replace("login", "");
        }
        return  window.location.href.replace("login", "") + "contact/"
    }, [location]);

    const aboutmeButtonHref = useMemo(() => {
        return  window.location.href.replaceAll(/((contact)|(login))(\/)*/g, "");
    }, [location]);


    return (
        <header className={"MainHeader"}>
            <div className={"MainHeaderContent"}>
                <div className={"TextLogo"}>
                    <div className="LogoSymbol">MZ</div>
                    <div className="LogoText"><span>Marija Zdolsek</span></div>
                </div>

                <div className={location.includes("contact") && !location.includes('login') ? "ContactSiteNav" : "MainSiteNav"}>
                    <ul className={location.includes("contact") && !location.includes('login')  ? "ContactSiteNavList" : "MainSiteNavList"}>
                        <li><a href={aboutmeButtonHref}>About me</a></li>
                        <li><a href={contactButtonHref}>Contact</a></li>
                        {!location.includes("login") && <li><a href={logButtonHref}>{location.includes("private-area") ? "Logout" : "Login"}</a></li>}
                    </ul>
                </div>
            </div>
        </header>
    );
}

export default Header;