import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import './App.css';

function App() {

    return (
        <Router>
            <div>
                <Routes>
                    <Route path="/login" element={<Login />} />   
                    <Route path="/register" element={<Register />} /> 
                </Routes>   
            </div>
        </Router>
    )
}

export default App
