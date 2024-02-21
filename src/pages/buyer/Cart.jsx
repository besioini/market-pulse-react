import { useState, useEffect } from 'react';
import cartService from '../../services/buyer/cartService';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import '../../styles/cart.css';

const Cart = () => {
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        const fetchCartItems = async () => {
            try {
                const cart = await cartService.getCart();
                setCartItems(cart.items);
            } catch (error) {
                console.error('Failed to load cart items:', error);
            }
        };

        fetchCartItems();
    }, []);

    const handleRemoveFromCart = async (itemId) => {
        if (window.confirm('Are you sure you want to remove this item from the cart?')) {
            try {
                await cartService.removeFromCart(itemId);
                setCartItems(cartItems.filter(item => item._id !== itemId));
                alert('Item removed successfully');
            } catch (error) {
                console.error('Failed to remove item from cart:', error);
                alert('Failed to remove item from cart.');
            }
        }
    };

    return (
        <>
            <Header userType={'regular'} />
            <div className="cart-container">
                {cartItems.map((item) => (
                    <div key={item._id} className="cart-item">
                        <h3>{item.productId.name}</h3>
                        <p>Quantity: {item.quantity}</p>
                        <button onClick={() => handleRemoveFromCart(item._id)}>Remove</button>
                    </div>
                ))}
            </div>
            <Footer />
        </>
    );
};

export default Cart;
