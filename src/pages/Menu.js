import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Nav from './Nav';
import Footer from './Footer';

const Menu = () => {
    const location = new URLSearchParams(useLocation().search).get("location");

    return (
        <div className="menu-page">
            <Nav />
            <h2>Menu</h2>
            <div className="card-container">
                <Link to={`/menu/pizza?location=${location}`} className="category-link">
                    Pizza
                </Link>
                <Link to={`/menu/sides?location=${location}`} className="category-link">
                    Side Orders
                </Link>
                <Link to={`/menu/beverages?location=${location}`} className="category-link">
                    Beverages
                </Link>
            </div>
            <Footer />
        </div>
    );
};

export default Menu;
