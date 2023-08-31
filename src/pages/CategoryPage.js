import React from 'react';
import { useParams } from 'react-router-dom';

const CategoryPage = ({ data }) => {
  const { type } = useParams();

  const categoryItems = data?.find(locationData => locationData.type === type)?.products;

  return (
    <div>
      <h2>{type} Items</h2>
      {categoryItems &&
        categoryItems.map(item => (
          <div key={item.id}>
            <h3>{item.name}</h3>
            <p>{item.description}</p>
            <p>Price: ${item.price}</p>
            <img src={item.image} alt={item.name} />
          </div>
        ))}
    </div>
  );
};

export default CategoryPage;
