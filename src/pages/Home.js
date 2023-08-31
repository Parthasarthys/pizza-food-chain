import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Card,
  CardContent,
  Button,
  Paper,
} from '@mui/material';
import { styled } from '@mui/system';
import Footer from './Footer';
import Nav from './Nav';
import MyCarousel from './Mycarousel';
import './Home.css';

const HeroSection = styled(Paper)(({ theme }) => ({
  backgroundImage: `url('https://img.freepik.com/free-photo/top-view-pepperoni-pizza-with-mushroom-sausages-bell-pepper-olive-corn-black-wooden_141793-2158.jpg?size=626&ext=jpg&ga=GA1.1.706817220.1692890516&semt=sph')`,
  backgroundPosition: 'center',
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
  height: '500px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: 'white',
  textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
  marginBottom: theme.spacing(4),
}));

const AboutSection = styled('div')(({ theme }) => ({
  padding: theme.spacing(4),
  backgroundColor: '#F0F8FF', // Light blue background color
}));

const ColoredCard = styled(Card)(({ theme }) => ({
  backgroundColor: '#FFE4B5', // Moccasin color
  marginBottom: theme.spacing(2),
}));

const Home = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="home-container">
      <AppBar position="static">
        <Nav />
        <br/>
        <br/>
        <br/>
      </AppBar>
      <HeroSection>
        <Container>
          <Typography variant="h2">Welcome to Oven Masters</Typography>
          <Typography variant="subtitle1">Discover the Art of Flavors</Typography>
        </Container>
      </HeroSection>
      <MyCarousel/>
      <Container>
        <AboutSection>
          <Typography variant="h4">About Oven Masters</Typography>
          <Typography variant="body1">
            Oven Masters is a culinary haven where passion meets perfection. We
            specialize in crafting exquisite dishes that tantalize your taste
            buds and leave you craving more. With a blend of premium ingredients
            and expert techniques, we take food to a whole new level of
            indulgence.
          </Typography>
          {/* Rest of your content */}
        </AboutSection>

        {/* Colored Card */}
        <ColoredCard>
        
        </ColoredCard>
        {/* Add more colored cards */}

      </Container>
      <Footer scrollToTop={scrollToTop} />
    </div>
  );
};

export default Home;
