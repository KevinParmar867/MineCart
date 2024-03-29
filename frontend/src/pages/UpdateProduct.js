import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Card from '../components/Card/Card';
import { updateProduct } from '../redux/reducer/productReducer';
import { useNavigate, useParams } from 'react-router-dom';
// import { updateProduct } from '../redux/reducer/productReducer';

const UpdateProduct = () => {
    const { id } = useParams(); // Accessing the product ID from the URL params
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const products = useSelector(state => state.product.products);

    // State to store the updated product data
    const [updatedProductData, setUpdatedProductData] = useState({
        name: "",
        description: "",
        price: "",
        category: "",
        quantity: "",
        image: null
    });

    // useEffect to fetch product data when the component mounts
    useEffect(() => {
        // Find the product with the given ID from the Redux store
        const productToUpdate = products.find(product => product._id === id);

        // Set the updated product state with the retrieved product data
        if (productToUpdate) {
            setUpdatedProductData(productToUpdate);
        }
    }, [id, products]);


    const onChange = (e) => {
        if (e.target.name === "image") {
            setUpdatedProductData({ ...updatedProductData, [e.target.name]: e.target.files[0] });
        } else {
            setUpdatedProductData({ ...updatedProductData, [e.target.name]: e.target.value });
        }
    };


    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();

        formData.append("name", updatedProductData.name);
        formData.append("description", updatedProductData.description);
        formData.append("price", updatedProductData.price);
        formData.append("category", updatedProductData.category);
        formData.append("quantity", updatedProductData.quantity);
        formData.append("image", updatedProductData.image);

        await dispatch(updateProduct({ id, productData: formData }));

        // Navigate to the home page
        navigate('/');
    };

    return (
        <div className="container auth">
            <Card>
                <div className="form">
                    <h2>Update Product</h2>
                    <form onSubmit={handleSubmit}>
                        <input
                            type="text"
                            placeholder="Product Name"
                            name="name"
                            value={updatedProductData.name}
                            onChange={onChange}
                            required
                        />
                        <textarea
                            placeholder="Description"
                            name="description"
                            value={updatedProductData.description}
                            onChange={onChange}
                            required
                        />
                        <input
                            type="number"
                            placeholder="Price"
                            name="price"
                            value={updatedProductData.price}
                            onChange={onChange}
                            required
                        />
                        <input
                            type="number"
                            placeholder="Quantity"
                            name="quantity"
                            value={updatedProductData.quantity}
                            onChange={onChange}
                            required
                        />
                        <input
                            type="file"
                            name="image"
                            onChange={onChange}
                        />
                        <select
                            name="category"
                            value={updatedProductData.category}
                            onChange={onChange}
                            required
                        >
                            <option value="">Select Category</option>
                            <option value="Category 1">Category 1</option>
                            <option value="Category 2">Category 2</option>
                        </select>
                        <button type="submit" className="--btn --btn-primary --btn-block">
                            Update Product
                        </button>
                    </form>
                </div>
            </Card>
        </div>
    );
};

export default UpdateProduct;
