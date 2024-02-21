import axios from 'axios';
import utils from '../../utility/utils.js';

const baseURL = 'http://localhost:5000/api/cart';


const addToCart = async (productId, quantity) => {
    const userId = utils.getUserId();
    if (!userId) throw new Error('User not authenticated');

    try {
        await axios.post(
            `${baseURL}/addToCart`, 
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
            `${baseURL}/getCart/${userId}`, 
            { headers: utils.getAuthHeaders() }
        );
        return response.data;
    } catch (error) {
        console.error('Error fetching cart:', error);
        throw error;
    }
};

const removeFromCart = async (itemId) => {
    try {
        await axios.delete(
            `${baseURL}/removeFromCart/${itemId}`, 
             { headers: utils.getAuthHeaders() }
        );
    } catch (err) {
        console.error('Error removing item from cart:', err.message);
        throw err;
    }
};

const updateCartItem = async (productId, quantity) => {
    const userId = utils.getUserId();
    if (!userId) throw new Error('User not authenticated');

    try {
        await axios.put(
            `${baseURL}/updateCartItem`, 
            { userId, productId, quantity }, 
            { headers: utils.getAuthHeaders() }
        );
    } catch (err) {
        console.error('Error updating cart item:', err.message);
        throw err;
    }
};

export default { addToCart, getCart, removeFromCart, updateCartItem };
