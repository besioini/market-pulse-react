import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import productService from '../../services/seller/productService';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import utils from '../../utility/utils';


const UpdateProduct = () => {
    const [productData, setProductData] = useState({
        name: '',
        description: '',
        price: '',
        category: '',
        quantity: '',
        imageUrl: '',
    });

    const { productID } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProductDetail = async () => {
            try {
                const fetchedProduct = await productService.getProductDetail(productID);
                setProductData(fetchedProduct);
            } catch (err) {
                console.error('Error fetching product details', err.message);
                throw err;
            }
        };

        fetchProductDetail();

    }, [productID])

    if (!productData) {
        return <div>Loading...</div>;
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProductData({ ...productData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await productService.updateProduct(productID, productData);
            alert('Product updated successfully!');
            navigate(`/seller/product/${productID}`);
        } catch (error) {
            console.error('Error updating product:', error);
            alert('Failed to update product.');
        }
    };

    const userType = utils.getUserType();

    return (
        <>
            <Header userType={userType}/>
            <div className='container'>
                <h2>Update Product</h2>
                <form id="product-form" onSubmit={handleSubmit}>
                    <input
                        type="text" 
                        name="name" 
                        value={productData.name} 
                        onChange={handleChange} 
                        placeholder="Product Name" 
                        required 
                    />
                    <textarea
                        name="description" 
                        value={productData.description} 
                        onChange={handleChange} 
                        placeholder="Product Description" 
                        required 
                    />
                    <input
                        type="number" 
                        name="price" 
                        value={productData.price} 
                        onChange={handleChange} 
                        placeholder="Price" 
                        required 
                    />
                    <select
                        name='category'
                        value={productData.category}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select a Category</option>
                        <option value="electronics">Electornics</option>
                        <option value="sports">Sports</option>
                        <option value="clothes">Clothes</option>
                        <option value="home">Home</option>
                        <option value="books">Books</option>
                    </select>
                    <input 
                        type="number" 
                        name="quantity" 
                        value={productData.quantity} 
                        onChange={handleChange} 
                        placeholder="Quantity" 
                        required 
                    />
                    <input
                        type="text" 
                        name="imageUrl" 
                        value={productData.imageUrl} 
                        onChange={handleChange} 
                        placeholder="Image URL" 
                        required 
                    />
                    <button type="submit">Update Product</button>
                </form>
            </div>
            <Footer />
        </>
    );
};

export default UpdateProduct;
