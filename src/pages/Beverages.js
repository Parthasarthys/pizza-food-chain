import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import './Beverages.css'; // Make sure to import your CSS file
import Nav from './Nav';
import Footer from './Footer';
import Size from './Size';
function Beverages() {
  const location = useLocation();
  const selectedLocation = location.state && location.state.selectedLocation;

  const [items, setItems] = useState([]);
  const [displayedItems, setDisplayedItems] = useState([]);

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
          setItems(data);
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
    setDisplayedItems(items.filter(item => item.type === 'beverages' && item.category === 'Soft Drinks'));
  }, [items]);

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
      <h2>Soft Drinks</h2>
      <div className="beverages-card-container">
        {displayedItems.map(item => (
          <div key={item.id} className="beverages-card">
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
      <br />
      <br />
      <br />
      <br />
      <Footer scrollToTop={scrollToTop} />
    </div>
  );
}

export default Beverages;
