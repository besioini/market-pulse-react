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

    const handleChangeQuantity = async (itemId, newQuantity) => {

    };

    const handleRemoveFromCart = async (itemId) => {
        if (window.confirm('Are you sure you want to remove this item from the cart?')) {
            try {
                await cartService.removeFromCart(itemId);
                setCartItems(cartItems.filter(item => item.productId._id !== itemId));
            } catch (error) {
                console.error('Failed to remove item from cart:', error);
                alert('Failed to remove item from cart.');
            }
        }
    };

    return (
        <>
            <Header userType='regular'/>
            <div className="cart-container">
                {cartItems.map(item => (
                    <div key={item.productId._id} className="cart-item">
                        <h3>{item.productId.name}</h3>
                        <input
                            type="number"
                            value={item.quantity}
                            onChange={(e) => handleChangeQuantity(item.productId._id, e.target.value)}
                            min="1"
                        />
                        <button onClick={() => handleRemoveFromCart(item.productId._id)}>Remove</button>
                    </div>
                ))}
            </div>
            <Footer />
        </>
    );
};

export default Cart;
