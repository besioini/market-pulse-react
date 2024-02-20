import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header';
import Product from '../../components/Product';
import Footer from '../../components/Footer';
import productService from '../../services/seller/productService';
import '../../styles/product.css';
import '../../App.css';

const Store = () => {
    const [products, setProducts] = useState([]);
    
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProducts = async () => {
            const fetchedProducts = await productService.getAllProducts();
            setProducts(fetchedProducts);
        };

        fetchProducts();
    }, []);

    const handleClick = (productID) => {
        navigate(`/seller/product/${productID}`);
    }

    const handleList = () => {
        navigate('/seller/product/post')
    }
    return (
        <div className="">
            <Header userType='seller' />
            <div id="post-product">
                <button onClick={handleList}>List Product</button>
            </div>
            <div id='products-container'>
                {products.map((product) => {
                    return <Product key={product._id} product={product} onClick={handleClick}/>
                })}

            </div>
            <Footer />
        </div>
    )
}

export default Store;