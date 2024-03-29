import React, { useEffect } from "react";
import "./Header.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
    logout, RESET
} from "../../redux/reducer/authReducer";

const Header = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { isLoggedIn} = useSelector(
        (state) => state.auth
    );

    const goHome = () => {
        navigate("/");
    };

    const logoutUser = () => {
        dispatch(RESET());
        dispatch(logout());
        navigate("/login");
    };

    useEffect(() => {
        // You can perform any additional actions here if needed
    }, [isLoggedIn]);

    return (
        <header className="header">
            <nav>
                <div className="logo" onClick={goHome}>
                    <span>AUTH</span>
                </div>

                <ul className="home-links">
                    {!isLoggedIn ? (
                        <>
                            <li>
                                <button className="--btn --btn-primary">
                                    <Link to="/login">Login</Link>
                                </button>
                            </li>
                            <li>
                                <button className="--btn --btn-primary">
                                    <Link to="/register">Register</Link>
                                </button>
                            </li>
                        </>
                ) : (
                            <li>
                                <button className="--btn --btn-secondary"
                                    onClick={logoutUser}
                                >
                                    Logout
                                </button>
                            </li>
                )}
                  
                      
                   
                </ul>
            </nav>
        </header>
    );
};

export default Header;