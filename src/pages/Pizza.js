import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Nav from './Nav';
import Footer from './Footer';

const Pizza = () => {
    const { location, category } = useParams();
    const [items, setItems] = useState([]);

    useEffect(() => {
        // Fetch items of the specified category and location
        fetch(`https://curly-pumas-type.loca.lt/customer/menu/by-category?location=${location}&category=${category}`)
            .then(response => response.json())
            .then(data => setItems(data))
            .catch(error => console.error('Error fetching data:', error));
    }, [location, category]);

    return (
        <div>
            <Nav />
            <h2>{category} Category</h2>
            <div className="card-container">
                {items.map((item, index) => (
                    <div key={index} className="card">
                        <img src={item.image} alt={item.name} />
                        <h3>{item.name}</h3>
                        <p>{item.description}</p>
                        <p>Price: ${item.price}</p>
                    </div>
                ))}
            </div>
            <Footer />
        </div>
    );
}

export default Pizza;
