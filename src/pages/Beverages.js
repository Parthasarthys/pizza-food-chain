
import React, { useState, useEffect } from 'react';
// import { signOut } from "firebase/auth";
// import { auth } from './config/firebaseconfig';
import { useNavigate } from 'react-router-dom';
import Footer from './Footer';
import Nav from './Nav';
import './Beverages.css'; 

const Beverages = () => {
    const navigate = useNavigate();
    const [apiData, setApiData] = useState([]);
 

    useEffect(() => {
        // Fetch data from the API
        fetch('https://jsonplaceholder.typicode.com/photos?_limit=6') // Limit to 5 data entries
            .then(response => response.json())
            .then(data => setApiData(data))
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    // const handleLogout = () => {
    //     signOut(auth)
    //         .then(() => {
    //             navigate("/");
    //             console.log("Signed out successfully");
    //         })
    //         .catch((error) => {
    //             console.error('Error signing out:', error);
    //         });
    // }


    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    return (
        <div className="home-container">
            <Nav className="nav" />
            <br/>
            <br/>
            <br/>
            <h2>Beverage</h2>
            <div className="card-container">
                {apiData.map(item => (
                    <div key={item.id} className="card">
                        <img src={item.thumbnailUrl} alt={item.title} />
                        <h3>{item.title}</h3>
                        <button className="card-button">Add to Cart</button> 
                    </div>
                ))}
            </div>
            <Footer scrollToTop={scrollToTop}/> 
        </div>
    );
}

export default Beverages;