import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Nav from './Nav';
import Footer from './Footer';

const CategoryPage = () => {
    const location = new URLSearchParams(useLocation().search).get("location");
    const category = new URLSearchParams(useLocation().search).get("category"); // Extract the category from URL query parameter

    const [categoryItems, setCategoryItems] = useState([]);

    useEffect(() => {
        // Fetch category items based on location and category
        fetch(`https://f430-103-93-20-138.ngrok-free.app/api/menu/by-location-category?location=${location}&category=${category}`)
            .then(response => response.json())
            .then(data => setCategoryItems(data))
            .catch(error => console.error('Error fetching data:', error));
    }, [location, category]);

    return (
        <div className="category-page">
            <Nav />
            <h2>{category} Items</h2>
            <div className="card-container">
                {/* Render category items here */}
                {categoryItems.map(item => (
                    <div key={item.id} className="card">
                        <img src={item.image} alt={item.name} />
                        <h3>{item.name}</h3>
                        <p>{item.description}</p>
                        {/* Add more details about the item */}
                    </div>
                ))}
            </div>
            <Footer />
        </div>
    );
};

export default CategoryPage;
