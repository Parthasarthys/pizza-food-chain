import React, { useEffect, useState } from 'react';
import { useLocation,useNavigate } from 'react-router-dom';
import './Sideorders.css'; // Make sure to import your CSS file
import Nav from './Nav';
import Footer from './Footer';
import Size from './Size';
function SideOrders() {
  const location = useLocation();
  const selectedLocation = location.state && location.state.selectedLocation;
  const navigate =  useNavigate();
  const [items, setItems] = useState([]);
  const [displayedItems, setDisplayedItems] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState('Breads'); // Default to breads

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = `https://6657-103-93-20-138.ngrok-free.app/api/menu/by-location/products?location=${selectedLocation}`;
        const response = await fetch(url, {
          method: "get",
          headers: new Headers({
            "ngrok-skip-browser-warning": "69420",
          }),
        });

        if (response.ok) {
          const data = await response.json();
          if (Array.isArray(data)) {
            setItems(data.filter(item => item.type === 'appetizers').map(item => ({ ...item, quantity: 1 }))); // Filter for appetizers type
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

  const handleCategoryFilterChange = (filter) => {
    setCategoryFilter(filter);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  const addToCart = async (productId) => {
    try {
      // Get the stored id from local storage
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
        selectedItem.selectedSizeId
      ) {
      
        console.log(storedId);
        console.log(selectedItem.id);
        console.log(selectedItem.selectedSizeId);
        console.log(selectedItem.quantity);
  
        const url = 'https://6657-103-93-20-138.ngrok-free.app/api/cartitems/cart/add'; // Replace with your backend URL
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            "ngrok-skip-browser-warning": "69420",
          },
          body: JSON.stringify({
            user: { id: storedId },
            product: { id: selectedItem.id },
            size: { id: selectedItem.selectedSizeId },
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
    
  const handleSizeSelect = (itemId, setId) => {
    const updatedItems = items.map(item => {
      if (item.id === itemId) {
        return { ...item, selectedSizeId: setId };
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
      <h2>Appetizers</h2>
      <div className="category-titles">
        <h3
          className={`category-title ${categoryFilter === 'Breads' ? 'active' : ''}`}
          onClick={() => handleCategoryFilterChange('Breads')}
        >
          Breads
        </h3>
        <h3
          className={`category-title ${categoryFilter === 'Desserts' ? 'active' : ''}`}
          onClick={() => handleCategoryFilterChange('Desserts')}
        >
          Desserts
        </h3>
        <h3
          className={`category-title ${categoryFilter === 'Taco' ? 'active' : ''}`}
          onClick={() => handleCategoryFilterChange('Taco')}
        >
          Taco
        </h3>
      </div>
      <div className="side-orders-container">
        {displayedItems.map(item => (
          <div key={item.id} className="side-order-card">
            <img src={item.image} alt={item.name} />
            <h3>{item.name}</h3>
            <p>{item.description}</p>
            <p>Price: Rs.{item.price.toFixed(2)}</p>
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
                       Add to Cart
             </button>
          </div>
        ))}
      </div>
      <br/>
      <br/>
      <br/>
      <br/>

      <Footer scrollToTop={scrollToTop} />
    </div>
  );
}

export default SideOrders;
