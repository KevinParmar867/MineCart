import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../redux/reducer/authReducer";
import productReducer from "../redux/reducer/productReducer";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        product: productReducer,

    },
});