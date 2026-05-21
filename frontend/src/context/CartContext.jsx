import { createContext, useState, useEffect, useContext } from 'react';
import { AuthContext } from './AuthContext';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const { user } = useContext(AuthContext);
    const [cartItems, setCartItems] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    
    // Create a user-specific key, or fallback to guest if no user
    const cartKey = user ? `cartItems_${user.id || user._id}` : 'cartItems_guest';

    useEffect(() => {
        const storedCart = localStorage.getItem(cartKey);
        if (storedCart) {
            try {
                setCartItems(JSON.parse(storedCart));
            } catch (e) {
                console.error("Failed to parse cart items");
                setCartItems([]);
            }
        } else {
            setCartItems([]);
        }
    }, [cartKey]);

    useEffect(() => {
        localStorage.setItem(cartKey, JSON.stringify(cartItems));
    }, [cartItems, cartKey]);

    const addToCart = (product, quantity = 1, color = null, size = null) => {
        const productId = product.id || product._id;
        setCartItems(prev => {
            const existing = prev.find(item => item.productId === productId && item.size === size && item.color === color);
            if (existing) {
                return prev.map(item => item.productId === productId && item.size === size && item.color === color ? { ...item, quantity: item.quantity + quantity } : item);
            }
            return [...prev, {
                id: Math.random().toString(36).substr(2, 9), // for mapping keys
                productId,
                productName: product.name,
                productBrand: product.brand,
                productPrice: product.price,
                productImage: product.image && product.image.length > 0 ? product.image[0] : '',
                quantity,
                color,
                size
            }];
        });
    };

    const updateQuantity = (productId, color, size, nextQuantity) => {
        setCartItems(prev => prev.map(item => 
            item.productId === productId && item.color === color && item.size === size
                ? { ...item, quantity: nextQuantity }
                : item
        ));
    };

    const removeFromCart = (productId, color, size) => {
        setCartItems(prev => prev.filter(item => !(item.productId === productId && item.size === size && item.color === color)));
    };

    const clearCart = () => {
        setCartItems([]);
    };

    const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

    return (
        <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart, updateQuantity, isLoading, cartCount }}>
            {children}
        </CartContext.Provider>
    );
};

export default CartContext;
