import React, { useEffect, useState } from "react";
import "./auth.css";
import Card from "../../components/Card/Card";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import PasswordInput from "../../components/PasswordInput/PasswordInput";
import PasswordStrengthIndicator from "../../components/PasswordStrength/PasswordStrength";

import {
    register,
    RESET,
} from "../../redux/reducer/authReducer";

const initialState = {
    name: "",
    email: "",
    password: "",
    password2: "",
};

const Register = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [formData, setFormData] = useState(initialState);
    const { name, email, password, password2 } = formData;

    const [isPasswordValid, setIsPasswordValid] = useState(false);

    const handleStrengthChange = (uCase, num, sChar, passLength) => {
        setIsPasswordValid(uCase && num && sChar && passLength);
    };

    const { isLoggedIn, isSuccess, message } = useSelector(
        (state) => state.auth
    );

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const registerUser = async (e) => {
        e.preventDefault();

        if (!name || !email || !password) {
            return toast.error("All fields are required");
        }
        if (password.length < 6) {
            return toast.error("Passwords must be up to 6 characters");
        }
        if (password !== password2) {
            return toast.error("Passwords do not match");
        }

        const userData = {
            name,
            email,
            password,
        };
        console.log(userData);

         dispatch(register(userData));
    };

    useEffect(() => {
        if (isLoggedIn && isSuccess) {
            navigate("/");
        }

        dispatch(RESET());
    }, [isLoggedIn, isSuccess, message, navigate, dispatch]);

    return (
        <div className="container auth">
            <Card>
                <div className="form">

                    <h2>Register</h2>

                    <form onSubmit={registerUser}>
                        <input
                            type="text"
                            placeholder="Name"
                            required
                            name="name"
                            value={name}
                            onChange={handleInputChange}
                        />
                        <input
                            type="email"
                            placeholder="Email"
                            required
                            name="email"
                            value={email}
                            onChange={handleInputChange}
                        />
                        <PasswordInput
                            placeholder="Password"
                            name="password"
                            value={password}
                            onChange={handleInputChange}
                        />
                        <PasswordInput
                            placeholder="Confirm Password"
                            name="password2"
                            value={password2}
                            onChange={handleInputChange}
                            onPaste={(e) => {
                                e.preventDefault();
                                toast.error("Cannot paste into input field.");
                                return false;
                            }}
                        />

                        <PasswordStrengthIndicator
                            password={password}
                            onStrengthChange={handleStrengthChange}
                        />

                        <button type="submit"
                            disabled={!isPasswordValid}
                            className={`--btn --btn-primary --btn-block 
                               ${isPasswordValid ? '' : '--btn-disabled'}`
                            }>
                            Register
                        </button>
                    </form>

                    <span className="register">
                        <Link to="/">Home</Link>
                        <p> &nbsp; Already have an account? &nbsp;</p>
                        <Link to="/login">Login</Link>
                    </span>
                </div>
            </Card>
        </div>
    );
};

export default Register;