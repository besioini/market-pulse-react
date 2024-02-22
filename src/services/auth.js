import axios from 'axios';
import utils from '../utility/utils';

const baseURL = 'http://localhost:5000/api/users';



const login = async (credentials) => {
    try {
        const response = await axios.post(
            `${baseURL}/login`, 
            credentials
        );
        if (!response.data.token) {
            throw new Error('Login failed'); 
        }
        localStorage.setItem('authToken', response.data.token);
        localStorage.setItem('userType', response.data.userType);
        return response.data;
    } catch (err) {
        throw new Error('Login failed');
    }
};

const register = async (userData) => {
    try {
        const response = await axios.post(
            `${baseURL}/register`, 
            userData
        );
        if (!response.data.token) {
            throw new Error('Registration failed'); 
        }
        localStorage.setItem('authToken', response.data.token);
        localStorage.setItem('userType', response.data.userType);
        return response.data;
    } catch (err) {
        throw new Error('Registration failed');
    }
};

const getProfile = async () => {
    const userId = utils.getUserId();
    if (!userId) throw new Error('User not authenticated');

    try {
        const response = await axios.get(
            `${baseURL}/getProfile/${userId}`, 
            { headers: utils.getAuthHeaders() }
        );
        return response.data;
    } catch (error) {
        console.error('Error fetching profile:', error);
        throw error;
    }
};

const updateProfile = async (profileData) => {
    const userId = utils.getUserId();
    if (!userId) throw new Error('User not authenticated');

    try {
        await axios.put(
            `${baseURL}/updateProfile/${userId}`, 
            profileData, 
            { headers: utils.getAuthHeaders() }
        );
    } catch (error) {
        console.error('Error updating profile:', error);
        throw error;
    }
};

const deleteAccount = async () => {
    const userId = utils.getUserId();
    if (!userId) throw new Error('User not authenticated');

    try {
        await axios.delete(`${baseURL}/deleteAccount/${userId}`, 
        { headers: utils.getAuthHeaders() });
        localStorage.removeItem('authToken'); 
    } catch (error) {
        console.error('Error deleting account:', error);
        throw error;
    }
};

export default { login, register, getProfile, updateProfile, deleteAccount }