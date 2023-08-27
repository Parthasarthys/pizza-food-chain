import React, { useState, useEffect } from 'react';
// import { signOut } from "firebase/auth";
// import { auth } from './config/firebaseconfig';
import { useNavigate } from 'react-router-dom';
import Footer from './Footer';
import Nav from './Nav';
import './Home.css'; 
import MyCarousel from './Mycarousel';
const Home = () => {
    const navigate = useNavigate();

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div className="home-container">
            <Nav className="nav" />
            <MyCarousel className="carousel"/>
            <div className="image-section">
                <img src="https://img.freepik.com/free-photo/top-view-pepperoni-pizza-with-mushroom-sausages-bell-pepper-olive-corn-black-wooden_141793-2158.jpg?size=626&ext=jpg&ga=GA1.1.706817220.1692890516&semt=sph" alt="Website Banner" />
            </div>
           
            <div className="image-info">
                    <h2>Welcome to Oven Masters</h2>
                    <p>Discover the Art of Flavors</p>
                    {/* <button className="explore-button">Explore Now</button> */}
                </div>
            
            {/* About Oven Masters */}
            <div className="manual-content">
                <h2>About Oven Masters</h2>
                <p>
                    Oven Masters is a culinary haven where passion meets perfection. We specialize
                    in crafting exquisite dishes that tantalize your taste buds and leave you craving more.
                    With a blend of premium ingredients and expert techniques, we take food to a whole
                    new level of indulgence.
                </p>
                <p>
                    Our master chefs are dedicated to bringing you an unforgettable dining experience,
                    whether you're enjoying a cozy meal for two or celebrating a special occasion with friends.
                    From sumptuous main courses to delectable desserts, each dish is a masterpiece that reflects
                    our commitment to quality and innovation.
                </p>
                <p>
                    Join us on a culinary journey that celebrates the art of flavors. Explore our diverse menu,
                    embrace the warmth of our hospitality, and savor every moment with Oven Masters.
                </p>
                <h2> What We Need - More Choice. More Fun.</h2>
                <p>No matter what the situation, pizza always helps. Especially a pizza that gives you the 
                    freedom to choose your toppings - from paneer, crisp capsicum, onion, grilled mushroom, 
                    golden corn, black olives, fresh tomato, red paprika, jalapeno, paneer tikka and extra 
                    cheese to non-veg toppings such as pepper barbeque chicken, peri-peri chicken, grilled 
                    chicken rasher, chicken sausage or chicken tikka- the options are almost endless, 
                    anything and everything you can think of that too on top of the crust of your 
                    choice - New hand-tossed crust, wheat thin crust, cheese burst crust, classic
                     hand-tossed crust or a fresh pan pizza. </p>
            </div>
            <br/>
            <Footer scrollToTop={scrollToTop}/> 
        </div>
    );
}

export default Home;