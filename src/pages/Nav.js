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

  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        handleShow(true);
      } else {
        handleShow(false);
      }
    };

    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    setUserLoggedIn(isLoggedIn);

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
    navigate(`/home/menu?location=${location}`);
  };

  const handleCartClick = () => {
    // Navigate to the cart page
    navigate('/cart');
  };

  const handleAvatarClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleSignOut = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('id');
    setUserLoggedIn(false);
    handleMenuClose();
  };

  // Get the first letter of the email for the Avatar
  const userInitial = userLoggedIn ? localStorage.getItem('email')[0].toUpperCase() : '';

  return (
    <AppBar position="fixed" color="default">
      <Toolbar>
        <IconButton onClick={handleViewMenu} edge="start" color="black" aria-label="menu">
          <MenuIcon />
        </IconButton>

        <div style={{ flexGrow: 200 }} />

        {userLoggedIn ? (
          <>
            <IconButton onClick={handleCartClick} edge="end" color="inherit">
              <ShoppingCart />
            </IconButton>

            <IconButton onClick={handleAvatarClick} edge="end" color="inherit">
              <Avatar>{userInitial}</Avatar>
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
