import axios from 'axios';

const baseURL = 'http://localhost:5000/api/products';

const fetchProducts = async () => {
    try {
        const response = await axios.get(`${baseURL}/getAllProducts`);
        return response.data;
    } catch (err) {
        console.error('Error fetching products:', err.message);
        throw err
    }
};

const fetchProductDetail = async (productID) => {
    try {
        const response = await axios.get(`${baseURL}/getProduct/${productID}`);
        return response.data;
    } catch (err) {
        console.error('Error fetching product detail', err.message);
        throw err;
    }
}

export default { fetchProducts, fetchProductDetail };