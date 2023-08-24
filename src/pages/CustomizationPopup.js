import React, { useState } from 'react';

const CustomizationPopup = ({ item, onClose, onAddToCart }) => {
    const [selectedSize, setSelectedSize] = useState('');
    const [selectedCrust, setSelectedCrust] = useState('');
    const [selectedToppings, setSelectedToppings] = useState([]);

    const handleAddToCartClick = () => {
        const customizedPizza = {
            ...item,
            size: selectedSize,
            crust: selectedCrust,
            toppings: selectedToppings,
        };

        onAddToCart(customizedPizza);
        onClose();
    };

    return (
        <div className="custom-popup">
            <h2>Customize {item.title}</h2>
            <label>Select Size:</label>
            <select value={selectedSize} onChange={e => setSelectedSize(e.target.value)}>
                {/* Options */}
            </select>
            {/* Add more options for crust and toppings */}
            <button onClick={handleAddToCartClick}>Add to Cart</button>
            <button onClick={onClose}>Close</button>
        </div>
    );
};

export default CustomizationPopup;
