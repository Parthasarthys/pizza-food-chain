import React, { useEffect, useState } from 'react';
import {  useLocation, useNavigate} from 'react-router-dom';
import './Pizza.css';
import Nav from './Nav';
import Footer from './Footer';
import Size from './Size';
import Toppings from './Toppings';
import Crust from './Crust';
import axios from 'axios'; 

function Pizza() {
  const location = useLocation();
  const selectedLocation = location.state && location.state.selectedLocation;
  const navigate =  useNavigate();
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [items, setItems] = useState([]);
  const [displayedItems, setDisplayedItems] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState('vegetarian'); // Default to vegetarian
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedToppingsId, setSelectedToppingsId] = useState(null);
  const [selectedCrustId, setSelectedCrustId] = useState(null);
  const [selectedSizeId, setSelectedSizeId] = useState(null);
  const [quantity, setQuantity] = useState(1);
//   const token = localStorage.getItem('tokenId')

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = `https://f8a2-2401-4900-1f27-37-4c1c-1230-eeec-3ba4.ngrok-free.app/api/menu/by-location/products?location=${selectedLocation}`;
        const response = await fetch(url, {
          method: "get",
          headers: new Headers({
            "ngrok-skip-browser-warning": "69420",
            
          }),
        });

        if (response.ok) {
          const data = await response.json();
          if (Array.isArray(data)) {
            setItems(data.filter(item => item.type === 'pizza').map(item => ({ ...item, quantity: 1 }))); // Adjust type property value as needed
          } else {
            console.log("No items found in the data");
          }
        } else {
          console.log("Error fetching data:", response.status);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData();
  }, [selectedLocation]);
  

  useEffect(() => {
    setDisplayedItems(items.filter(item => item.category === categoryFilter));
  }, [items, categoryFilter]);

  const handleFilterChange = (filter) => {
    setCategoryFilter(filter);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const addToCart = async (productId) => {
    try {
        // Check if the user is logged in
        const storedId = localStorage.getItem('id');
        const userLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

        if (!userLoggedIn) {
          navigate('/login'); // Redirect to login page if not logged in
          return;
        }                                       
      // Find the selected item based on productId
      const selectedItem = items.find(item => item.id === productId);
  
      // Check if all selections are made
      if (
        selectedItem &&
        selectedItem.selectedToppingsId &&
        selectedItem.selectedCrustId &&
        selectedItem.selectedSizeId
      ) {
        const orderData = {
          user: { id: storedId },
          product: { id: selectedItem.id },
          crust: { id: selectedItem.selectedCrustId },
          size: { id: selectedItem.selectedSizeId },
          toppings: {id: selectedItem.selectedToppingsId},
          quantity: selectedItem.quantity
        };
        console.log(storedId);
        console.log(selectedItem.id);
        console.log(selectedItem.selectedCrustId);
        console.log(selectedItem.selectedSizeId);
        console.log(selectedItem.selectedToppingsId);
        console.log(selectedItem.quantity);
  
        const url = 'https://f8a2-2401-4900-1f27-37-4c1c-1230-eeec-3ba4.ngrok-free.app/api/cartitems/cart/add'; // Replace with your backend URL
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            "ngrok-skip-browser-warning": "69420",
          },
          body: JSON.stringify({
            user: { id: storedId },
            product: { id: selectedItem.id },
            crust: { id: selectedItem.selectedCrustId },
            size: { id: selectedItem.selectedSizeId },
            toppings: [{id: selectedItem.selectedToppingsId}],
            quantity: selectedItem.quantity
          }),
        });
  
        if (response.ok) {
          console.log('Item added to cart successfully');
          // Navigate to the cart page
          navigate("/cart");
        } else {
          console.error('Error adding item to cart:', response.status);
        }
      } else {
        console.log('Please select all options before adding to cart.');
      }
    } catch (error) {
      console.error('Error adding item to cart:', error);
    }
  };
  
  const handleToppingsSelect = (itemId, setId) => {
    const updatedItems = items.map(item => {
      if (item.id === itemId) {
        return { ...item, selectedToppingsId: setId };
      }
      return item;
    });
    setItems(updatedItems);
  };
  
  const handleSizeSelect = (itemId, setId) => {
    const updatedItems = items.map(item => {
      if (item.id === itemId) {
        return { ...item, selectedSizeId: setId };
      }
      return item;
    });
    setItems(updatedItems);
  };
  const handleCrustSelect = (itemId, setId) => {
    const updatedItems = items.map(item => {
      if (item.id === itemId) {
        return { ...item, selectedCrustId: setId };
      }
      return item;
    });
    setItems(updatedItems);
  };
  
  const handleQuantityChange = (itemId, newQuantity) => {
    const updatedItems = items.map(item => {
      if (item.id === itemId) {
        return { ...item, quantity: Math.max(newQuantity, 1) };
      }
      return item;
    });
    setItems(updatedItems);
  };

  return (
    <div>
      <Nav />
      <h2>Pizza Items</h2>
      <div className="category-titles">
        <h3
          className={`category-title ${categoryFilter === 'vegetarian' ? 'active' : ''}`}
          onClick={() => handleFilterChange('vegetarian')}
        >
          Veg
        </h3>
        <h3
          className={`category-title ${categoryFilter === 'non-vegetarian' ? 'active' : ''}`}
          onClick={() => handleFilterChange('non-vegetarian')}
        >
          Non-Veg
        </h3>
      </div>
      <div className="pizza-card-container">
        {displayedItems.map(item => (
          <div key={item.id} className="pizza-card">
            <img src={item.image} alt={item.name} />
            <h3>{item.name}</h3>
            <p>{item.description}</p>
            <p>Price: Rs.{item.price.toFixed(2)}</p>
            <Toppings
              selectedLocation={selectedLocation}
              selectedToppingsId={item.selectedToppingsId}
             onToppingsSelect={setId => handleToppingsSelect(item.id, setId)}
            />
            <Crust
              selectedLocation={selectedLocation}
              selectedCrustId={item.selectedCrustId}
           onCrustSelect={setId => handleCrustSelect(item.id, setId)}
            />
            <Size
              selectedLocation={selectedLocation}
              selectedSizeId={item.selectedSizeId}
              onSizeSelect={setId => handleSizeSelect(item.id, setId)}
            />
           <div className="quantity-container">
              <button onClick={() => handleQuantityChange(item.id, item.quantity - 1)}>-</button>
              <span>{item.quantity}</span>
              <button onClick={() => handleQuantityChange(item.id, item.quantity + 1)}>+</button>
            </div>

            <button className="add-to-cart-button" onClick={() => addToCart(item.id)}>
            {userLoggedIn ? 'Add to Cart' : 'Login to Add'}
          </button>
          </div>
        ))}
      </div>
      <br/>
      <br/>
      <br/>
      <Footer scrollToTop={scrollToTop} />
    </div>
  );
}

export default Pizza;
