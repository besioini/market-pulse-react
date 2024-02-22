import axios from 'axios';
import utils from '../../utility/utils';

const baseURL = 'https://market-pulse-server.vercel.app/api/products';

const addProduct = async (productData) => {
    try {
        const response = await axios.post(
            `${baseURL}/addProduct`,
            productData,
            { headers: utils.getAuthHeaders() }
        );
        return response.data;
    } catch (err) {
        console.error('Error adding product:', err.message);
        throw err;
    }
};

const getAllProducts = async () => {
    const token = localStorage.getItem('authToken');
    const sellerId = utils.getUserId(token);

    if (!token) {
        console.log('Authentication failed: No seller ID or token found');
        return;
    }

    try {
        const response = await axios.get(
            `${baseURL}/getAllSellerProducts/${sellerId}`, 
            { headers: utils.getAuthHeaders() }
        );
        return response.data;
    } catch (err) {
        console.error('Error fetching products:', err.message);
        throw err;
    }
};


const getProductDetail = async (productID) => {
    try {
        const response = await axios.get(`${baseURL}/getProduct/${productID}`);
        return response.data;
    } catch (err) {
        console.error('Error fetching product detail', err.message);
        throw err;
    }
}

const updateProduct = async (productID, productData) => {
    try {
        const response = await axios.put(
            `${baseURL}/updateProduct/${productID}`,
            productData,
            { headers: utils.getAuthHeaders() }
        )
        return response.data;
    } catch (err) {
        console.error('Error updating product', err.message);
        throw err;
    }
}
const deleteProduct = async (productId) => {
    const token = localStorage.getItem('authToken');
    
    try {
        const response = await axios.delete(
            `${baseURL}/removeProduct/${productId}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return response.data;
    } catch (err) {
        console.error('Error removing product:', err.message);
        throw err;
    }
};

export default {
    addProduct,
    getAllProducts,
    getProductDetail,
    updateProduct,
    deleteProduct
}