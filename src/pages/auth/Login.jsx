import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../../styles/login-register.css';
import '../../App.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        navigate('/home')
    }

    return (
        <div className='container'>
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <input 
                    type='email' 
                    placeholder='Email'
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}    
                />
                <input 
                    type="password"
                    placeholder='password'
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}  
                />
                <button type='submit'>Login</button>
                <p>Don't have an account? <Link to='/register'>Register</Link></p>
            </form>
        </div>
    )
}

export default Login