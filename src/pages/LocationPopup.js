import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import './LocationPopup.css';

const LocationPopup = ({ onClose }) => {
  const [selectedLocation, setSelectedLocation] = useState('');
  const navigate = useNavigate();
  const [open, setOpen] = useState(true);

  const handleLocationChange = (e) => {
    setSelectedLocation(e.target.value);
  };

  const handleConfirmLocation = () => {
    navigate('/menu', { state: { data: selectedLocation } }); // Updated this line
    setOpen(false);
    onClose();
  };

  const handleClose = () => {
    setOpen(false);
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} className="location-popup">
      <DialogTitle>Select Location</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Please select a location to proceed.
        </DialogContentText>
        <FormControl fullWidth>
          <InputLabel id="location-label">Location</InputLabel>
          <Select
            labelId="location-label"
            id="location"
            value={selectedLocation}
            onChange={handleLocationChange}
          >
            <MenuItem value="" disabled>
              Select Location
            </MenuItem>
            <MenuItem value="Kormangala%20Branch">Kormangala Branch</MenuItem>
            <MenuItem value="Jayanagar%20Branch">Jayanagar Branch</MenuItem>
            <MenuItem value="HSR">HSR Layout</MenuItem>
            <MenuItem value="KR">K.R. Market</MenuItem>
            {/* Add more location options as needed */}
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleConfirmLocation} color="primary">
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default LocationPopup;
