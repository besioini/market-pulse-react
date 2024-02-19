import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import BuyerHome from './pages/buyer/BuyerHome';
import ProductDetail from './pages/buyer/ProductDetail';
import Cart from './pages/buyer/Cart';
import Profile from './pages/auth/Profile';
import './App.css';

function App() {

    return (
        <Router>
            <Routes>
                <Route path="/login" element={<Login />} />   
                <Route path="/register" element={<Register />} /> 
                <Route path="/buyer/home" element={<BuyerHome />} />
                <Route path="/buyer/product/:productID" element={<ProductDetail />} />
                <Route path="/buyer/cart" element={<Cart />} />
                <Route path="/buyer/profile" element={<Profile />} />
            </Routes>   
        </Router>
    )
}

export default App
