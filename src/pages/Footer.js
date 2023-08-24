import React from 'react';
import './Footer.css'; // Import your custom CSS file

const Footer = ({ scrollToTop }) => {
    return (
        <footer className="footer">
            <div className="footer-links">
                <a href="#about">About</a>
                <a href="#feedback">Feedback</a>
            </div>
            <button className="to-top-btn" onClick={scrollToTop}>
                Go to Top
            </button>
        </footer>
    );
}

export default Footer;
