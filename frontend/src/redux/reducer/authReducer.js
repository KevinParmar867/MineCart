import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import authService from "../services/authService";

const initialState = {
    isLoggedIn: false,
    user: null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: "",
};

// Register user
export const register = createAsyncThunk("auth/register", async (userData, thunkAPI) => {
    try {
        return await authService.register(userData);
    } catch (error) {
        const message =
            (error.response &&
                error.response.data &&
                error.response.data.message) ||
            error.message ||
            error.toString();
            console.log(message);
        return thunkAPI.rejectWithValue(message);
    }
}
);

// Login user
export const login = createAsyncThunk(
    "auth/login",
    async (userData, thunkAPI) => {
        try {
            return await authService.login(userData);
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

// Logout user
export const logout = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
    try {
        return await authService.logout();
    } catch (error) {
        const message =
            (error.response && error.response.data && error.response.data.message) ||
            error.message ||
            error.toString();
        return thunkAPI.rejectWithValue(message);
    }
});

// Get Login Status
export const getLoginStatus = createAsyncThunk(
    "auth/loginStatus",
    async (_, thunkAPI) => {
        try {
            return await authService.getLoginStatus();
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

// Get User
export const getUser = createAsyncThunk("auth/getUser", async (_, thunkAPI) => {
    try {
        return await authService.getUser();
    } catch (error) {
        const message =
            (error.response && error.response.data && error.response.data.message) ||
            error.message ||
            error.toString();
        return thunkAPI.rejectWithValue(message);
    }
});


const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        RESET: (state) => {
            state.isLoading = false;
            state.isSuccess = false;
            state.isError = false;
            state.twoFactor = false;
            state.message = "";
        },

    },

    extraReducers: (builder) => {
        builder
            // Register

            .addCase(register.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(register.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.isLoggedIn = true;
                state.user = action.payload;
                toast.success("Registration Successful");
            })
            .addCase(register.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
                state.user = null;
                toast.error(action.payload);
            })

            // Login

            .addCase(login.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.isLoggedIn = true;
                state.user = action.payload;
                toast.success("Login successfully");
            })
            .addCase(login.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
                state.user = null;
                toast.error(action.payload);
                if (action.payload.includes("login code")) {
                    state.twoFactor = true;
                }
            })
            // Logout
            .addCase(logout.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(logout.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.isLoggedIn = false;
                state.message = action.payload;
            })
            .addCase(logout.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })

            // Get Login Status
            .addCase(getLoginStatus.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getLoginStatus.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.isLoggedIn = action.payload;
            })
            .addCase(getLoginStatus.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })

            // Get User
            .addCase(getUser.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.user = action.payload;
            })
            .addCase(getUser.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
                toast.error(action.payload);
            })


    },
});

export const { RESET } = authSlice.actions;
export const selectIsLoggedIn = (state) => state.auth.isLoggedIn;
export const selectName = (state) => state.auth.name;
export const selectUser = (state) => state.auth.user;

export default authSlice.reducer;