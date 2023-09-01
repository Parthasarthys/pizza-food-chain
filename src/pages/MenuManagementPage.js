import React from 'react';
import './MenuManagementPage.css';
const MenuManagementPage = () => {
  const handleAddItem = () => {
    // Logic for adding a new menu item
    console.log('Add item clicked');
  };

  const handleEditItem = () => {
    // Logic for editing a menu item
    console.log('Edit item clicked');
  };

  const handleDeleteItem = () => {
    // Logic for deleting a menu item
    console.log('Delete item clicked');
  };

  return (
    <div>
      <h1>Menu Management Page</h1>
      <button  className="menu-button" onClick={handleAddItem}>Add Item</button>
      <button className="menu-button" onClick={handleEditItem}>Edit Item</button>
      <button className="menu-button" onClick={handleDeleteItem}>Delete Item</button>
    </div>
  );
};

export default MenuManagementPage;
