import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, IconButton, Button, Avatar, Menu, MenuItem } from '@mui/material';
import { ShoppingCart, Menu as MenuIcon } from '@mui/icons-material';
import LocationPopup from './LocationPopup'; // Import the LocationPopup component
import './Nav.css';

const Nav = () => {
  const [show, handleShow] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState('');
  const navigate = useNavigate();

  const [userLoggedIn, setUserLoggedIn] = useState(false); // State to track user login status
  const [anchorEl, setAnchorEl] = useState(null); // State for the dropdown menu anchor

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        handleShow(true);
      } else {
        handleShow(false);
      }
    };

    // Check user login status from local storage and set isLoggedIn accordingly
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    setUserLoggedIn(isLoggedIn);
    console.log(isLoggedIn);
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleViewMenu = () => {
    setIsPopupOpen(true);
  };

  const handlePopupClose = () => {
    setIsPopupOpen(false);
  };

  const handleLocationSelect = (location) => {
    setSelectedLocation(location);
    setIsPopupOpen(false);
    // Navigate to the menu page with the selected location as a query parameter
    navigate(`/home/menu?location=${location}`);
  };

  const handleAvatarClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleSignOut = () => {
    // Remove login status from local storage and update state
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('id');
    setUserLoggedIn(false);
    handleMenuClose();
  };

  return (
    <AppBar position="fixed" color="default" >
      <Toolbar>
        <IconButton onClick={handleViewMenu} edge="start" color="black" aria-label="menu">
          <MenuIcon />
        </IconButton>

        <div style={{ flexGrow: 200 }} /> {/* Spacer to push content to the right */}
        
        {userLoggedIn ? (
          <>
            <IconButton edge="end" color="inherit">
              <ShoppingCart />
            </IconButton>

            <IconButton onClick={handleAvatarClick} edge="end" color="inherit">
              <Avatar>S</Avatar>
            </IconButton>

            <Menu anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleMenuClose}>
              <MenuItem onClick={handleSignOut}>Sign Out</MenuItem>
            
            </Menu>
          </>
        ) : (
          <Link to="/login">
            <Button color="inherit">Login</Button>
          </Link>
        )}

        {isPopupOpen && <LocationPopup onClose={handlePopupClose} onLocationSelect={handleLocationSelect} />}
      </Toolbar>
    </AppBar>
  );
};

export default Nav;
