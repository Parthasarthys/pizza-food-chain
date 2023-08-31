import React from 'react';
import { Button, Link, styled } from '@mui/material'; // Import Button and Link from MUI

// Define your custom styled components using MUI's styled function
const FooterContainer = styled('footer')({
  backgroundColor: 'black',
  color: '#fff',
  padding: '20px',
  textAlign: 'center',
  marginTop: 30,
});

const FooterLinks = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  marginBottom: '10px',
});

const ToTopButton = styled(Button)({
  backgroundColor: '#f50057',
  color: '#fff',
});

const Footer = ({ scrollToTop }) => {
  return (
    <FooterContainer>
      <FooterLinks>
        <Link href="#about" color="inherit" underline="none" style={{ margin: '0 10px' }}>
          About
        </Link>
        <Link href="#feedback" color="inherit" underline="none" style={{ margin: '0 10px' }}>
          Feedback
        </Link>
      </FooterLinks>
      <ToTopButton onClick={scrollToTop}>Go to Top</ToTopButton>
    </FooterContainer>
  );
};

export default Footer;
