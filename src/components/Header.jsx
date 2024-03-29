import { Link } from 'react-router-dom';
import '../styles/header.css'

const Header = ({ userType }) => {

    const handleLogout = () => {
        if(window.confirm('Are you sure you want to log out?')) {
            localStorage.removeItem('authToken');
        }

    }

    return (
        <header>
            <nav>
                <ul>
                    {userType === 'regular' ? (
                            <>
                                <li><Link to="/buyer/home">Home</Link></li>
                                <li><Link to="/buyer/cart">Cart</Link></li>
                                <li><Link to="/profile">Profile</Link></li>                    
                            </>
                        ) : (
                            <>
                                <li><Link to="/seller/home">Home</Link></li>
                                <li><Link to="/seller/store">Store</Link></li>
                                <li><Link to="/profile">Profile</Link></li>      
                            </>
                        )
                    }
                    <li><Link to='/login'  onClick={handleLogout}>Logout</Link></li>
                </ul>
            </nav>
        </header>
    )
}

export default Header