import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Header from '../../components/Header';
import productService from '../../services/buyer/productService';
import cartService from '../../services/buyer/cartService';
import '../../App.css';
import '../../styles/product.css';

const ProductDetail = () => {
    const { productID } = useParams();
    const [product, setProduct] = useState();
    const [quantity, setQuantity] = useState(1);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchProductDetail = async () => {
            try {
                const fetchedProduct = await productService.fetchProductDetail(productID);
                setProduct(fetchedProduct);
            } catch (err) {
                console.error('Error fetching product details', err.message);
                throw err;
            }
        };

        fetchProductDetail();

    }, [productID])

    if (!product) {
        return <div>Loading...</div>;
    }

    const handleQuantityChange = (e) => {
        setQuantity(e.target.value)
    }

    const handleAddToCart = async () => {
        try {
            await cartService.addToCart(productID, quantity);
            navigate('/buyer/cart')
        } catch (err) {
            console.error('Error adding item to cart', err.message);
            alert('Error adding item to cart');
        }
    }
    return(
        <>
            <Header userType='regular' />
            <div className="product-detail">
                <img src={product.imageUrl} alt={product.name} />
                <h2>{product.name}</h2>
                <p>{product.description}</p>
                <p>Price: ${product.price}</p>
                <input 
                    type="text" 
                    name={quantity}
                    value={quantity}
                    onChange={handleQuantityChange} 
                />
                <button onClick={handleAddToCart}>Add to cart</button>
            </div>        
        </>

    )
}

export default ProductDetail;