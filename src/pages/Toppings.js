import React, { useEffect, useState } from 'react';

function Toppings({ selectedLocation, selectedToppingsId, onToppingsSelect }) {
  const [details, setDetails] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = `https://f8a2-2401-4900-1f27-37-4c1c-1230-eeec-3ba4.ngrok-free.app/api/menu/by-location?location=${selectedLocation}`;
        const response = await fetch(url, {
          method: "get",
          headers: new Headers({
            "ngrok-skip-browser-warning": "69420",
          }),
        });

        if (response.ok) {
          const data = await response.json();
          setDetails(data);
          console.log(data);
        } else {
          console.log("Error fetching data:", response.status);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData();
  }, [selectedLocation]);

  const handleToppingsChange = (event) => {
    const selectedId = event.target.value;
    onToppingsSelect(selectedId); // Invoke the onToppingsSelect callback
  };

  return (
    <div>
      {/* Check if details[0] exists */}
      {details[0] && (
        <>
          {/* Render the dropdown only if details[0].toppings exists */}
          {details[0].toppings && (
            <div>
              <label>Choose Topping:</label>
              <select onChange={handleToppingsChange} value={selectedToppingsId || ''}>
                <option value="">Select a topping</option>
                {details[0].toppings.map((topping) => (
                  <option key={topping.id} value={topping.id}>
                    {topping.name} - {topping.price}
                  </option>
                ))}
              </select>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default Toppings;
