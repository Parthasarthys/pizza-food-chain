import {React, useState} from 'react';
import { Carousel } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'; // Make sure to import Bootstrap CSS

const images = ['https://img.freepik.com/free-psd/food-menu-delicious-pizza-social-media-banner-template_106176-1328.jpg?size=626&ext=jpg', 
                 'https://img.freepik.com/free-psd/food-menu-delicious-pizza-social-media-banner-template_120329-3324.jpg?size=626&ext=jpg', 
                 'https://img.freepik.com/free-psd/food-menu-delicious-pizza-social-media-banner-template_106176-1311.jpg?size=626&ext=jpg',
                'https://img.freepik.com/free-psd/food-menu-delicious-pizza-social-media-banner-template_106176-362.jpg?size=626&ext=jpg']; // Replace with your image URLs

                const MyCarousel = () => {
                    const [index, setIndex] = useState(0);
                  
                    const handleSelect = (selectedIndex, e) => {
                      setIndex(selectedIndex);
                    };
                  
                    return (
                      <Carousel activeIndex={index} onSelect={handleSelect}>
                        {images.map((image, idx) => (
                          <Carousel.Item key={idx}>
                            <img
                               className="d-block w-100"
                                 src={image}
                                  alt={`Slide ${idx}`}
                                   style={{ maxWidth: '100%', maxHeight: '400px' }} // Adjust the values as needed
                                  />
                          </Carousel.Item>
                        ))}
                      </Carousel>
                    );
                  };
                  
                  export default MyCarousel;