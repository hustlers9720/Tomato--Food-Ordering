import React from "react";
import "./Footer.css";
import { assets } from "../../assets/assets";

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-content">
                {/* Left Section */}
                <div className="footer-section">
                    <img className="footer-logo" src={assets.logo} alt="Logo" />
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maxime cupiditate dolor temporibus asperiores ex sint eius porro iusto deleniti.
                    </p>
                    <div className="footer-social">
                        <img src={assets.facebook_icon} alt="Facebook" />
                        <img src={assets.twitter_icon} alt="Twitter" />
                        <img src={assets.linkedin_icon} alt="LinkedIn" />
                    </div>
                </div>

                {/* Center Section */}
                <div className="footer-section">
                    <h3>COMPANY</h3>
                    <ul>
                        <li>Home</li>
                        <li>About Us</li>
                        <li>Delivery</li>
                        <li>Privacy Policy</li>
                    </ul>
                </div>

                {/* Right Section */}
                <div className="footer-section">
                    <h3>GET IN TOUCH</h3>
                    <ul>
                        <li>+99998888XX</li>
                        <li>contact@tomato.com</li>
                    </ul>
                </div>
            </div>

            <hr className="hr" />
            <p className="footer-copyright">© 2025 Tomato. All rights reserved.</p>
        </footer>
    );
};

export default Footer;
