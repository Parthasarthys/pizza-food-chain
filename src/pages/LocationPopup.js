import React, { useState } from 'react';
import './LocationPopup.css'; // Import your CSS for the popup

const LocationPopup = ({ onClose, onLocationSelect }) => {
    const [selectedLocation, setSelectedLocation] = useState('');

    const handleLocationChange = (e) => {
        setSelectedLocation(e.target.value);
    };

    const handleConfirmLocation = () => {
        onLocationSelect(selectedLocation);
    };

    return (
        <div className="location-popup">
            <div className="popup-content">
                <h3>Select Location</h3>
                <select className="location-select" value={selectedLocation} onChange={handleLocationChange}>
                    <option value="" disabled>Select Location</option>
                    <option value="location1">Location 1</option>
                    <option value="location2">Location 2</option>
                    {/* Add more location options as needed */}
                </select>
                <button onClick={onClose}>Cancel</button>
                <button onClick={handleConfirmLocation}>Confirm</button>
            </div>
        </div>
    );
}

export default LocationPopup;
