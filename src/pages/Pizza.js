import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from './Footer';
import Nav from './Nav';
import CustomizationPopup from './CustomizationPopup'; // Make sure to import the CustomizationPopup component
import './Pizza.css';

const Pizza = () => {
    const navigate = useNavigate();
    const [apiData, setApiData] = useState([]);
    const [showCustomPopup, setShowCustomPopup] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        // Fetch data from the API
        fetch('https://jsonplaceholder.typicode.com/photos?_limit=6')
            .then(response => response.json())
            .then(data => setApiData(data))
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    const handleAddToCart = (item) => {
        setCartItems(prevItems => [...prevItems, item]);
    };

    const handleCustomizeClick = (item) => {
        setSelectedItem(item);
        setShowCustomPopup(true);
    };

    const closeCustomPopup = () => {
        setShowCustomPopup(false);
        setSelectedItem(null);
    };

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    return (
        <div className="home-container">
            <Nav className="nav" />
            <br/>
            <h2>Pizza</h2>
            <div className="card-container">
                {apiData.map(item => (
                    <div key={item.id} className="card">
                        <img src={item.thumbnailUrl} alt={item.title} />
                        <h3>{item.title}</h3>
                        <button className="card-button" onClick={() => handleAddToCart(item)}>Add to Cart</button>
                        <button className="card-button" onClick={() => handleCustomizeClick(item)}>Customize</button>
                    </div>
                ))}
            </div>
            <Footer scrollToTop={scrollToTop}/> 
            {showCustomPopup && (
                <CustomizationPopup
                    item={selectedItem}
                    onClose={closeCustomPopup}
                    onAddToCart={handleAddToCart}
                />
            )}
        </div>
    );
}

export default Pizza;
