import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/auth/Login';
import './App.css';

function App() {

    return (
        <Router>
            <div>
                <Routes>
                    <Route path="/login" element={<Login />} />    
                </Routes>   
            </div>
        </Router>
    )
}

export default App
