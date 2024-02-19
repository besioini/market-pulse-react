import { useState, useEffect }from 'react';
import { useNavigate } from 'react-router-dom';
import Search from '../../components/Search';
import Header from '../../components/Header';
import Filter from '../../components/Filter';
import Product from '../../components/Product';
import Footer from '../../components/Footer';
import productService from '../../services/buyer/productService';
import '../../styles/product.css';
import '../../App.css';

const BuyerHome = () => {
    const [products, setProducts] = useState([]);
    
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProducts = async () => {
            const fetchedProducts = await productService.fetchProducts();
            setProducts(fetchedProducts);
        };

        fetchProducts();
    }, []);

    const handleClick = (productID) => {
        navigate(`/buyer/product/${productID}`);
    }
    
    return (
        <div className="buyer-home">
            <Header userType='regular' />
            <Search />
            <Filter />
            <div id='products-container'>
                {products.map((product) => {
                    return <Product key={product._id} product={product} onClick={handleClick}/>
                })}

            </div>
            <Footer />
        </div>
    )
}

export default BuyerHome