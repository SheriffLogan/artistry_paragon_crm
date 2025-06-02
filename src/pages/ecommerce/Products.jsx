// src/pages/ecommerce/Products.jsx
import React, { useEffect, useState } from 'react';
import { fetchProducts } from '../../config/ApiConfig';

const Products = () => {
  const [list, setList] = useState([]);
  useEffect(() => {
    fetchProducts().then(setList);
  }, []);

  return (
    <div className="p-4">
      <h2>Products</h2>
      <ul>
        {list.map(p => (
          <li key={p.id}>
            <strong>{p.name}</strong><br/>
            ${ (p.priceCents/100).toFixed(2) }
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Products;
