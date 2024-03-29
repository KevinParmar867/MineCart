import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import Card from '../components/Card/Card';
import { addProduct } from '../redux/reducer/productReducer';
import { useNavigate } from 'react-router-dom';

const Product = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [product, setProduct] = useState({
    name: "", description: "", price: "", category: "",
    quantity: "",
    image: null
  });

  const onChange = (e) => {
    if (e.target.name === "image") {
      setProduct({ ...product, [e.target.name]: e.target.files[0] });
    } else {
      setProduct({ ...product, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {

    const formData = new FormData();

    formData.append("name", product.name);
    formData.append("description", product.description);
    formData.append("price", product.price);
    formData.append("category", product.category);
    formData.append("quantity", product.quantity);
    formData.append("image", product.image);


    await dispatch(addProduct(formData));
    // Reset the form fields
    setProduct({
      name: "", description: "", price: "", category: "",
      quantity: "",
      image: null
    });

    // Navigate to the home page
    navigate('/');
  };

  return (
    <div className="container auth">
      <Card>
        <div className="form">
          <h2>Upload Product</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Product Name"
              name="name"
              value={product.name}
              onChange={onChange}
              required
            />
            <textarea
              placeholder="Description"
              name="description"
              value={product.description}
              onChange={onChange}
              required
            />
            <input
              type="number"
              placeholder="Price"
              name="price"
              value={product.price}
              onChange={onChange}
              required
            />
            <input
              type="number"
              placeholder="Quantity"
              name="quantity"
              value={product.quantity}
              onChange={onChange}
              required
            />
            <input
              type="file"
              name="image"
              onChange={onChange}
              required
            />
            <select
              name="category"
              value={product.category}
              onChange={onChange}
              required
            >
              <option value="">Select Category</option>
              <option value="Category 1">Category 1</option>
              <option value="Category 2">Category 2</option>
            </select>
            <button type="submit" className="--btn --btn-primary --btn-block">
              Upload Product
            </button>
          </form>
        </div>
      </Card>
    </div>
  );
};

export default Product;
