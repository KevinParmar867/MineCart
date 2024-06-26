import axios from "axios";

const BACKEND_URL = (process.env.REACT_APP_BACKEND_URL || "http://localhost:5000");
export const API_URL = `${BACKEND_URL}/api/auth/`;

export const validateEmail = (email) => {
    return email.match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

// Register User
const register = async (userData) => {
    console.log(userData)
    const response = await axios.post(API_URL + "register", userData, {
        withCredentials: true,
    });
    return response.data;
};

// Login user
const login = async (userData) => {
    const response = await axios.post(API_URL + "login", userData);
    return response.data;
};

// Logout user
const logout = async () => {
    const response = await axios.get(API_URL + "logout");
    return response.data;
};

// Get Login Status
const getLoginStatus = async () => {
    const response = await axios.get(API_URL + "loginStatus");
    return response.data;
};

// Get User Profile
const getUser = async () => {
    const response = await axios.get(API_URL + "getUser");
    return response.data;
};

const authService = {
    register,
    login,
    logout,
    getLoginStatus,
    getUser
};

export default authService;