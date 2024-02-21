import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import authService from '../../services/auth';
import '../../styles/login-register.css';
import '../../App.css';

const Login = () => {
    const [credentials, setCredentials] = useState({ email: '', password: '' });
    const navigate = useNavigate();
    
    useEffect(() => {
        setCredentials({ email: '', password: '' });
    }, []);

    const handleChange = e => {
        const { name, value } = e.target;
        setCredentials({ ...credentials, [name]: value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await authService.login(credentials);
            navigate(response.userType === 'seller' ? '/seller/home' : '/buyer/home');
        } catch (err) {
            alert('Login Error');
        }
    }

    return (
        <div className='container'>
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <input 
                    type='email' 
                    name='email'
                    placeholder='Email'
                    required
                    value={credentials.email}
                    onChange={handleChange}    
                />
                <input 
                    type='password'
                    name='password'
                    placeholder='Password'
                    required
                    value={credentials.password}
                    onChange={handleChange}  
                />
                <button type='submit'>Login</button>
                <hr />
                <p>Don't have an account? <Link to='/register'>Register</Link></p>
            </form>
        </div>
    )
}

export default Login;
