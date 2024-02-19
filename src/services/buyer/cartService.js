import axios from 'axios';
import utils from '../../utility/utils.js';

const API_BASE_URL = 'http://localhost:5000/api/cart';


const addToCart = async (productId, quantity) => {
    const userId = utils.getUserId();
    if (!userId) throw new Error('User not authenticated');

    try {
        await axios.post(
            `${API_BASE_URL}/addToCart`, 
            { userId, productId, quantity }, 
            { headers: utils.getAuthHeaders() }
        );
    } catch (err) {
        console.error('Error adding product to cart:', err.message);
        throw err;
    }
};

const getCart = async () => {
    const userId = utils.getUserId() ;
    if (!userId) throw new Error('User not authenticated');

    try {
        const response = await axios.get(
            `${API_BASE_URL}/getCart/${userId}`, 
            { headers: utils.getAuthHeaders() }
        );
        return response.data;
    } catch (error) {
        console.error('Error fetching cart:', error);
        throw error;
    }
};

const removeFromCart = async (productId) => {
    const userId = utils.getUserId();
    if (!userId) throw new Error('User not authenticated');

    try {
        await axios.delete(
            `${API_BASE_URL}/removeFromCart/${productId}`, 
            { data: { userId }, 
            headers: utils.getAuthHeaders() }
        );
    } catch (error) {
        console.error('Error removing item from cart:', error);
        throw error;
    }
};

const updateCartItem = async (productId, quantity) => {
    const userId = utils.getUserId();
    if (!userId) throw new Error('User not authenticated');

    try {
        await axios.put(
            `${API_BASE_URL}/updateCartItem`, 
            { userId, productId, quantity }, 
            { headers: utils.getAuthHeaders() }
        );
    } catch (error) {
        console.error('Error updating cart item:', error);
        throw error;
    }
};

export default { addToCart, getCart, removeFromCart, updateCartItem };
