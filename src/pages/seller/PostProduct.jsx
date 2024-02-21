import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import productService from '../../services/seller/productService';
import utils from '../../utility/utils';
import '../../styles/product.css';

const PostProduct = () => {
    const [productData, setProductData] = useState({
        name: '',
        description: '',
        price: '',
        category: '',
        quantity: '',
        imageUrl: ''
    })

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProductData({ ...productData, [name]: value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const userId = utils.getUserId();
        try {
            await productService.addProduct({ ...productData, seller: userId });
            alert("Product added successfully");
            navigate('/seller/home');
        } catch (err) {
            console.error("Adding Product Failure", err.message);
            alert('Adding Product Failure')
        }
    }

    const userType = utils.getUserType();

    return (
        <div id="post-product" className='container'>
            <Header userType={userType}/>
            {/* <h2>List a New Product</h2> */}
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
                    <button type="submit">List Product</button>
            </form>
            <Footer />
        </div>
    )
}

export default PostProduct;