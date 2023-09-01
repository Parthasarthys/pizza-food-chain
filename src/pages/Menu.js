import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Card, CardContent, CardActions, Button, Typography } from '@mui/material';
import Nav from './Nav';
import Footer from './Footer';
import './Menu.css';

  import pizzaImage from './images/pizza.jfif';
  import sidesImage from './images/sidedishes.jfif';
  import beveragesImage from './images/beverages.jfif';

  const Menu = () => {
    const categories = [
      { title: 'Pizza', description: 'Delicious pizza options', link: 'pizza', image: pizzaImage },
      { title: 'Sides', description: 'Tasty side orders', link: 'sides', image: sidesImage },
      { title: 'Beverages', description: 'Refreshing beverages', link: 'beverages', image: beveragesImage },
    ];
  const location = useLocation();
  const selectedLocation = location.state && location.state.data; // Updated this line
   console.log(selectedLocation);
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="menu-page" style={{ backgroundColor: 'grey' }}>
      <Nav />
     
     <br/>
     <br/>
     <br/>
     <br/>
      <div className="card-container">
        {categories.map((category, index) => (
          <Card key={index} sx={{ minWidth: '250px', maxWidth: '300px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
            <CardContent style={{ textAlign: 'center' }}>
              <img
                src={category.image}
                alt={category.title}
                className="card-image"
                style={{ maxWidth: '100%', height: 'auto' }}
              />
              <Typography variant="h6" sx={{ marginTop: '10px' }}>{category.title}</Typography>
              <Typography variant="body2" sx={{ color: 'gray', marginTop: '5px' }}>{category.description}</Typography>
            </CardContent>
            <CardActions sx={{ justifyContent: 'center' }}>
              <Link to={`/menu/${category.link}`} state={{ selectedLocation }}>
                <Button color="primary">View All</Button>
              </Link>
            </CardActions>
          </Card>
        ))}
      </div>
      <Footer scrollToTop={scrollToTop} />
    </div>
  );
};

export default Menu;
