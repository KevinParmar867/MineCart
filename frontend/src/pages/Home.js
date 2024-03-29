import React, { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { deleteProduct, getProducts, selectProducts } from "../redux/reducer/productReducer";
import {useNavigate } from "react-router-dom";
import { selectUser } from '../redux/reducer/authReducer';

const BACKEND_URL = (process.env.REACT_APP_BACKEND_URL || "http://localhost:5000");

const Home = () => {
  const products = useSelector(selectProducts);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(selectUser)
  // State to store the user's search query
  const [search, setSearch] = useState("");

  // Filter the products based on the search query
  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );
  const handleDeleteProduct = async (productId) => {

    await dispatch(deleteProduct(productId));
    await dispatch(getProducts());
  };

  // Function to handle update product
  const handleUpdateProduct = (productId) => {
    navigate(`/Product/Update/${productId}`);
  };

  return (
    <div className='container'>
      <div className="search">
        <input
          type="text"
          className="searchClass"
          placeholder="Search for a product..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Display the suggestions */}
      <ul className="product-list">
        {filteredProducts.map((product, index) => (
          <li key={index}>
            <div className="product-card">
              <img src={`${BACKEND_URL}/${product.imageUrl}`} alt={product.name} />
              <div className="product-details">
                <h3>{product.name}</h3>
                <p>Description: {product.description}</p>
                <p>Price: ${product.price}</p>
                <p>Category: {product.category}</p>
                <p>Quantity: {product.quantity}</p>
                { user && user.role === 'admin' && 
                  <div className="product-actions --flex-between">
                    {/* Button to delete product */}
                    <button className='--btn --btn-danger' onClick={() => handleDeleteProduct(product._id)}>Delete</button>
                    {/* Button to update product */}
                    <button className='--btn --btn-primary' onClick={() => handleUpdateProduct(product._id)}>Update</button>
                  </div>
                }
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
