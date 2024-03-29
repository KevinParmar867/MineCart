import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import productService from "../services/productService";

const initialState = {
    products: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: "",
};

// Add product
export const addProduct = createAsyncThunk(
    "products/addProduct",
    async (productData, thunkAPI) => {
        try {
            return await productService.addProduct(productData);
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);

// Update product
export const updateProduct = createAsyncThunk(
    "products/updateProduct",
    async ({ id, productData }, thunkAPI) => {
        try {
            return await productService.updateProduct(id, productData);
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);

// Delete product
export const deleteProduct = createAsyncThunk(
    "products/deleteProduct",
    async (id, thunkAPI) => {
        try {
            return await productService.deleteProduct(id);
        } catch (error) {
            const message =
                (error.response && error.response.data && error.response.data.message) ||
                error.message ||
                error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);

// Fetch products
export const getProducts = createAsyncThunk(
    "products/getProducts",
    async (_, thunkAPI) => {
        try {
            return await productService.getProduct();
        } catch (error) {
            const message =
                (error.response && error.response.data && error.response.data.message) ||
                error.message ||
                error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);

const productSlice = createSlice({
    name: "products",
    initialState,
    reducers: {
        RESET: (state) => {
            state.isLoading = false;
            state.isSuccess = false;
            state.isError = false;
            state.message = "";
        },
    },
    extraReducers: (builder) => {
        builder
            // Add product
            .addCase(addProduct.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(addProduct.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.products.push(action.payload);
                toast.success("Product added successfully");
            })
            .addCase(addProduct.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
                toast.error(action.payload);
            })
            // Update product
            .addCase(updateProduct.pending, (state) => {
                state.isLoading = true;
            })
           
            .addCase(updateProduct.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                const updatedProductIndex = state.products.findIndex(
                    (product) => product._id === action.payload._id
                );
                if (updatedProductIndex !== -1) {
                    state.products[updatedProductIndex] = action.payload;
                }
                toast.success("Product updated successfully");
            })

            .addCase(updateProduct.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
                toast.error(action.payload);
            })
            // Delete product
            .addCase(deleteProduct.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteProduct.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.products = state.products.filter(
                    (product) => product.id !== action.payload
                );
                toast.success("Product deleted successfully");
            })
            .addCase(deleteProduct.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
                toast.error(action.payload);
            })
            
            // Fetch products
            .addCase(getProducts.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getProducts.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.products = action.payload;
                toast.success("Products fetched successfully");
            })
            .addCase(getProducts.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
                toast.error(action.payload);
            });
    },
});

export const { RESET } = productSlice.actions;
export const selectProducts = (state) => state.product.products;

export default productSlice.reducer;
