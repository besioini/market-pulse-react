import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import BuyerHome from './pages/buyer/BuyerHome';
import ProductDetail from './pages/buyer/ProductDetail';
import Cart from './pages/buyer/Cart';
import Profile from './pages/auth/Profile';
import SellerHome from './pages/seller/SellerHome';
import Store from './pages/seller/Store';
import ProductInfo from './pages/seller/ProductInfo';
import PostProduct from './pages/seller/PostProduct';
import UpdateProduct from './pages/seller/UpdateProduct';
import './App.css';

function App() {

    return (
        <Router>
            <Routes>
                <Route path="/" element={<Navigate replace to="/login" />} /> 
                <Route path="/login" element={<Login />} />   
                <Route path="/register" element={<Register />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/buyer/home" element={<BuyerHome />} />
                <Route path="/buyer/product/:productID" element={<ProductDetail />} />
                <Route path="/buyer/cart" element={<Cart />} />
 
                <Route path="/seller/home" element={<SellerHome />} />         
                <Route path="/seller/store" element={<Store />} />
                <Route path="/seller/product/:productID" element={<ProductInfo />} />
                <Route path="/seller/product/post" element={<PostProduct />} /> 
                <Route path="/seller/product/update/:productID" element={<UpdateProduct />} /> 
            </Routes>   
        </Router>
    )
}

export default App
