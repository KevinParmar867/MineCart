import React, { useEffect, useState } from "react";
import "./auth.css";
import Card from "../../components/Card/Card";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import PasswordInput from "../../components/PasswordInput/PasswordInput";
import {
  login,
  RESET,
} from "../../redux/reducer/authReducer";

const initialState = {
  email: "",
  password: "",
};

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState(initialState);
  const { email, password } = formData;

  const { isLoggedIn, isSuccess, isError} = useSelector(
    (state) => state.auth
  );

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const loginUser = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      return toast.error("All fields are required", {
        position: toast.POSITION.TOP_LEFT,
      });
    }

    const userData = { email, password };
    await dispatch(login(userData));
  };

  useEffect(() => {
    if (isLoggedIn && isSuccess) {
      navigate("/");
    }


    dispatch(RESET());
  }, [isSuccess, isLoggedIn, isError, email, navigate, dispatch]);

  return (
    <div className="container auth">
      <Card>
        <div className="form">
          <h2>Login</h2>

          <form onSubmit={loginUser}>
            <input
              type="email"
              placeholder="Email"
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

            <button type="submit" className="--btn --btn-primary --btn-block">
              Login
            </button>

          </form>
          <span className="register">
            <Link to="/">Home</Link>
            <p> &nbsp; Don't have an account? &nbsp;</p>
            <Link to="/register">Register</Link>
          </span>
        </div>
      </Card>
    </div>
  );
};

export default Login;