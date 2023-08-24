import React, { useState, useEffect } from 'react';
// import { signOut } from "firebase/auth";
// import { auth } from './config/firebaseconfig';
import { useNavigate } from 'react-router-dom';
import Footer from './Footer';
import Nav from './Nav';
import './Home.css'; 

const Home = () => {
    const navigate = useNavigate();
    const [apiData, setApiData] = useState([]);
    const [carouselIndex, setCarouselIndex] = useState(0); // State to track carousel index

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

    const handleCarouselPrev = () => {
        setCarouselIndex(prevIndex => (prevIndex === 0 ? apiData.length - 1 : prevIndex - 1));
    };

    const handleCarouselNext = () => {
        setCarouselIndex(prevIndex => (prevIndex === apiData.length - 1 ? 0 : prevIndex + 1));
    };
    
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    const handleDropdownSelect = (selectedOption) => {
        // Handle the selected option
        console.log(selectedOption);
    };
    return (
        <div className="home-container">
            <Nav className="nav" />
            <div className="carousel-container">
                <button className="carousel-prev" onClick={handleCarouselPrev}>
                    &lt;
                </button>
                <div className="carousel-content">
                    <img src={apiData[carouselIndex]?.thumbnailUrl} alt="Carousel" />
                </div>
                <button className="carousel-next" onClick={handleCarouselNext}>
                    &gt;
                </button>
            </div>
            <br/>
            <h2>Best Sellers</h2>
            <div className="card-container">
                {apiData.map(item => (
                    <div key={item.id} className="card">
                        <img src={item.thumbnailUrl} alt={item.title} />
                        <h3>{item.title}</h3>
                        <p>{item.description}</p>
                        <button className="card-button">Order Now</button> 
                    </div>
                ))}
            </div>
            <Footer scrollToTop={scrollToTop}/> 
        </div>
    );
}

export default Home;
