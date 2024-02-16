import axios from 'axios';

const baseURL = 'http://localhost:5000/api/users';

export const login = async(credentials) => {
    try {
        const response = await axios.post(`${baseURL}/login`, credentials);
        if (!response.data.token) {
            throw new Error('Login failed'); 
        }
        localStorage.setItem('authToken', response.data.token);
        return response.data;
    } catch (err) {
        throw new Error('Login failed');
    }
}

export const register = async (userData) => {
    try {
        const response = await axios.post(`${baseURL}/register`, userData);
        if (!response.data.token) {
            throw new Error('Registration failed'); 
        }
        localStorage.setItem('authToken', response.data.token);
        return response.data;
    } catch (err) {
        throw new Error('Registration failed');
    }
};


