import React, { useState, useEffect } from 'react';
import { Carousel } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'; // Make sure to import Bootstrap CSS

const MyCarousel = () => {
  const [index, setIndex] = useState(0);
  const [images, setImages] = useState([]); // State to store fetched images

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = `https://6657-103-93-20-138.ngrok-free.app/api/coupons`;
        const response = await fetch(url, {
          method: 'get',
          headers: new Headers({
            'ngrok-skip-browser-warning': '69420',
          }),
        });

        if (response.ok) {
          const data = await response.json();
          if (Array.isArray(data)) {
            const imageUrls = data.map(item => item.image); // Extract image URLs from fetched data
            setImages(imageUrls);
          } else {
            console.log('No image data found in the response');
          }
        } else {
          console.log('Error fetching data:', response.status);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchData();
  }, []); // No need for a dependency here

  return (
    <Carousel activeIndex={index} onSelect={handleSelect}>
      {images.map((image, idx) => (
        <Carousel.Item key={idx}>
          <img
            className="d-block w-100"
            src={image}
            alt={`Slide ${idx}`}
            style={{ maxWidth: '100%', maxHeight: '300px' }} // Adjust the values as needed
          />
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default MyCarousel;
