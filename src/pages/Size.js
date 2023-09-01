import React, { useEffect, useState } from 'react';

function Size({ selectedLocation, selectedSizeId, onSizeSelect }) {
  const [details, setDetails] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = `https://6657-103-93-20-138.ngrok-free.app/api/menu/by-location?location=${selectedLocation}`;
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

  const handleSizeChange = (event) => {
    const selectedId = event.target.value;
    onSizeSelect(selectedId); // Invoke the onSizeSelect callback
  };

  return (
    <div>
      {/* Check if details[0] exists */}
      {details[0] && (
        <>
          {details[0].size && (
            <div>
              <label>Choose Size:</label>
              <select onChange={handleSizeChange} value={selectedSizeId || ''}>
                <option value="">Select a size</option>
                {details[0].size.map((size) => (
                  <option key={size.id} value={size.id}>
                    {size.name} - {size.price_adjustment}
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

export default Size;
