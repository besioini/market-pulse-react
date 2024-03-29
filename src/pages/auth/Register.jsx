import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import authService from '../../services/auth';
import '../../styles/login-register.css';
import '../../App.css';

const Register = () => {
    const [userData, setUserData] = useState({
        firstname: '',
        lastname: '',
        username: '',
        email: '',
        password: '',
        type: ''
    });

    const navigate = useNavigate();

    useEffect(() => {
        setUserData({
            firstname: '',
            lastname: '',
            username: '',
            email: '',
            password: '',
            type: ''
        });
    }, []);

    const handleChange = e => {
        const { name, value } = e.target;
        setUserData({ ...userData, [name]: value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await authService.register(userData);
            console.log('Register Successful');
            navigate(response.userType === 'seller' ? '/seller/home' : '/buyer/home');
        } catch (err) {
            alert('Register Error');
        }
    };

    return (
        <div className='container'>
            <h3>Create account</h3>
            <form onSubmit={handleSubmit}>
                <input 
                    type='text'
                    name='firstname'
                    placeholder='First name'
                    value={userData.firstname}
                    onChange={handleChange}
                />
                <input 
                    type='text'
                    name='lastname'
                    placeholder='Last name'
                    value={userData.lastname}
                    onChange={handleChange}
                />
                <input 
                    type='text'
                    name='username'
                    placeholder='User name'
                    value={userData.username}
                    onChange={handleChange}
                />
                <input 
                    type='email'
                    name='email'
                    placeholder='Email'
                    value={userData.email}
                    onChange={handleChange}
                    required
                />
                <input 
                    type='password'
                    name='password'
                    placeholder='Password'
                    value={userData.password}
                    onChange={handleChange}
                    required
                />
                <select
                    name='type'
                    value={userData.type}
                    onChange={handleChange}
                    required>
                    <option value="">Select Account Type</option>
                    <option value="regular">Regular</option>
                    <option value="seller">Seller</option>
                </select>
                <button type="submit">Register</button>
                <hr />
                <p>Already have an account? <Link to='/login'>Login</Link></p>
            </form>
        </div>
    );
}

export default Register;
