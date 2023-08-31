import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import './Sideorders.css'; // Make sure to import your CSS file
import Nav from './Nav';
import Footer from './Footer';
import Size from './Size';
function SideOrders() {
  const location = useLocation();
  const selectedLocation = location.state && location.state.selectedLocation;

  const [items, setItems] = useState([]);
  const [displayedItems, setDisplayedItems] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState('Breads'); // Default to breads

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = `https://de62-103-93-20-138.ngrok-free.app/customer/menu/by-location/products?location=${selectedLocation}`;
        const response = await fetch(url, {
          method: "get",
          headers: new Headers({
            "ngrok-skip-browser-warning": "69420",
          }),
        });

        if (response.ok) {
          const data = await response.json();
          if (Array.isArray(data)) {
            setItems(data.filter(item => item.type === 'appetizers')); // Filter for appetizers type
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
  const handleQuantityChange = (item, newQuantity) => {
    const updatedItems = items.map(i => {
      if (i.id === item.id) {
        return { ...i, quantity: newQuantity };
      }
      return i;
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
            <Size selectedLocation={selectedLocation} />
            <div className="quantity-container">
              <button onClick={() => handleQuantityChange(item, (item.quantity || 1) - 1)}>-</button>
              <span>{item.quantity || 1}</span>
              <button onClick={() => handleQuantityChange(item, (item.quantity || 1) + 1)}>+</button>
            </div>
            <button className="add-to-cart-button">Add to Cart</button>
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
