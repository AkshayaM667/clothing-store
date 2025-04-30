import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';
import footer_logo from '../Assets/logo_big.png';
import instagram_icon from '../Assets/instagram_icon.png';
import pintester_icon from '../Assets/pintester_icon.png';
import whatsapp_icon from '../Assets/whatsapp_icon.png';

const Footer = () => {
    return (
        <div className="footer">
            <div className="footer-logo">
                <img src={footer_logo} alt="" />
                <p>AURAA ATTIRE</p>
            </div>
            <ul className="footer-links">
                <li><Link to="/company">Company</Link></li>
                <li><Link to="/products">Products</Link></li>
                <li><Link to="/offices">Offices</Link></li>
                <li><Link to="/about">About</Link></li>
                <li><Link to="/contact">Contact Us</Link></li>
            </ul>
            <div className="footer-social-icon">
    <div className="footer-icons-container">
        <a href="https://www.instagram.com/auraa_attire/" target="_blank" rel="noopener noreferrer">
            <img src={instagram_icon} alt="Instagram" />
        </a>
    </div>
    <div className="footer-icons-container">
        <a href="https://uk.pinterest.com/auraattiree/" target="_blank" rel="noopener noreferrer">
            <img src={pintester_icon} alt="Pinterest" />
        </a>
    </div>
    <div className="footer-icons-container">
        <a href="https://wa.me/918778232100" target="_blank" rel="noopener noreferrer">
            <img src={whatsapp_icon} alt="WhatsApp" />
        </a>
    </div>
</div>

            <div className="footer-copyright">
                <hr />
                <p>Copyright © 2024 - All Rights Reserved</p>
            </div>
        </div>
    );
};

export default Footer;
