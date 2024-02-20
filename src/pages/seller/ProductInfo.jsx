
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import productService from '../../services/seller/productService';
import '../../App.css';
import '../../styles/product.css';

const ProductInfo = () => {
    const { productID } = useParams();
    const [product, setProduct] = useState();

    const navigate = useNavigate();

    useEffect(() => {
        const fetchProductDetail = async () => {
            try {
                const fetchedProduct = await productService.getProductDetail(productID);
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

    const handleUpdate = () => {
        navigate(`/seller/product/update/${productID}`);
    };

    const handleDelete = async () => {
        try {
            await productService.deleteProduct(productID)
            alert('Product deleted successfully');
            navigate('/seller/home');
        } catch (err) {
            console.error('Product rmeoval failure', err.message);
            alert('Product removal failure');
        }
    }
    return(
        <>
            <Header />
            <div className="product-detail">
                <h2>{product.name}</h2>
                <p>{product.description}</p>
                <p>Price: ${product.price}</p>
                <p>Category: {product.category}</p>
                <p>Quantity: {product.quantity}</p>
                <img src={product.imageUrl} alt={product.name} />
                <button onClick={handleUpdate}>Edit</button>
                <button onClick={handleDelete}>Delete</button>
            </div>
            <Footer />        
        </>

    )
}

export default ProductInfo;