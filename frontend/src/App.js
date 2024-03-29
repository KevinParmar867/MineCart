import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Layout from './components/Layout/Layout';
import Home from './pages/Home';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  getLoginStatus,
  selectIsLoggedIn,
  getUser,
  selectUser,
} from "./redux/reducer/authReducer";
import { useEffect } from 'react';
import Product from './pages/Product';
import { getProducts } from './redux/reducer/productReducer';
import UpdateProduct from './pages/UpdateProduct';

axios.defaults.withCredentials = true;

function App() {

   const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const user = useSelector(selectUser)


  useEffect(() => {
    dispatch(getLoginStatus());
    dispatch(getProducts())
    dispatch(getUser());
 
  }, [dispatch,isLoggedIn]);

  return (
    <Router>
      <Routes>

        <Route exact path="/" element={<Layout><Home /></Layout>} />
        {user && user.role === 'admin' ? (
          <Route exact path="/Product" element={<Layout><Product /></Layout>} />
        ) : null}
        {user && user.role === 'admin' ? (
          <Route exact path="/Product/Update/:id" element={<Layout><UpdateProduct /></Layout>} />
        ) : null}
       
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;
