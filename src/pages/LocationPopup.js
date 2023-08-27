import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import the axios library
import './LocationPopup.css';

const LocationPopup = ({ onClose }) => {
    const [selectedLocation, setSelectedLocation] = useState('');
    const navigate = useNavigate();

    const handleLocationChange = (e) => {
        setSelectedLocation(e.target.value);
    };

    const handleConfirmLocation = async () => {
        try {
      
             console.log(selectedLocation);
        // Fetch data based on the selected location using axios
        const response = await axios.get(`https://9ae7-2401-4900-1f27-4898-f5ce-3458-9020-afa8.ngrok-free.app/customer/menu/by-location?location=${selectedLocation}`);
        console.log(selectedLocation);
        console.log('Response:', response.data);
        
        const data = response.data;
        console.log('Data:', data);
        
            // Navigate to MenuPage with selected location
            // navigate(`/menu?location=${selectedLocation}`, { state: { data } });
            onClose();
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleNavigateToMenuPage = () => {
        if (selectedLocation) {
            navigate(`/menu?location=${selectedLocation}`);
        }
    };

    return (
        <div className="location-popup">
            <div className="popup-content">
                <h3>Select Location</h3>
                <select className="location-select" value={selectedLocation} onChange={handleLocationChange}>
                    <option value="" disabled>Select Location</option>
                    <option value="Kormangala%20Branch">Kormangala Branch</option>
                    <option value="Jayanagar%20Branch">Jayanagar Branch</option>
                    {/* Add more location options as needed */}
                </select>
                <button onClick={onClose}>Cancel</button>
                <button onClick={handleConfirmLocation}>Confirm</button>
                <button onClick={handleNavigateToMenuPage}>Go to Menu</button>
            </div>
        </div>
    );
}

export default LocationPopup;
