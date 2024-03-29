import axios from "axios";

const BACKEND_URL = (process.env.REACT_APP_BACKEND_URL || "http://localhost:5000");
export const API_URL = `${BACKEND_URL}/api/product/`;



// Register User
const addProduct = async (userData) => {
    const response = await axios.post(API_URL + "add", userData, {
        withCredentials: true,
    });
    return response.data;
};

// update product
const updateProduct = async (id ,userData) => {
    console.log(userData);
    const response = await axios.put(API_URL + `update/${id}`, userData);
    return response.data;
};

//delete product
const deleteProduct = async (id) => {
    const response = await axios.delete(API_URL + `delete/${id}`);
    return response.data;
};

// Logout user
const getProduct = async () => {
    const response = await axios.get(API_URL + "productData");

    return response.data;
};

const authService = {
    addProduct,
    updateProduct,
    deleteProduct,
    getProduct
};

export default authService;