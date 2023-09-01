import React, { useEffect, useState } from 'react';

function Crust({ selectedLocation, selectedCrustId, onCrustSelect }) {
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

  const handleCrustChange = (event) => {
    const selectedId = event.target.value;
    onCrustSelect(selectedId); // Invoke the onCrustSelect callback
  };

  return (
    <div>
      {/* Check if details[0] exists */}
      {details[0] && (
        <>
          {/* Render the dropdown only if details[0].crust exists */}
          {details[0].crust && (
            <div>
              <label>Choose Crust:</label>
              <select onChange={handleCrustChange} value={selectedCrustId || ''}>
                <option value="">Select a crust</option>
                {details[0].crust.map((crust) => (
                  <option key={crust.id} value={crust.id}>
                    {crust.name} - {crust.price}
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

export default Crust;
