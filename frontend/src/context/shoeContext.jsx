import { createContext, useState, useEffect, useContext } from 'react';
import { AuthContext } from './AuthContext';

export const ShoeContext = createContext();

export const ShoeProvider = ({ children }) => {
    const { user } = useContext(AuthContext);
    const [shoes, setShoes] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [wishlist, setWishlist] = useState([]);
    
    // Create a user-specific key, or fallback to guest if no user
    const wishlistKey = user ? `wishlist_${user.id || user._id}` : 'wishlist_guest';

    useEffect(() => {
        const saved = localStorage.getItem(wishlistKey);
        if (saved) {
            try {
                setWishlist(JSON.parse(saved));
            } catch (e) {
                setWishlist([]);
            }
        } else {
            setWishlist([]);
        }
    }, [wishlistKey]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/product`);
                const data = await res.json();
                if (data.success && data.products) {
                    setShoes(data.products);
                } else if (Array.isArray(data)) {
                    setShoes(data);
                }
            } catch (error) {
                console.error("Failed to fetch products:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchProducts();
    }, []);

    useEffect(() => {
        localStorage.setItem(wishlistKey, JSON.stringify(wishlist));
    }, [wishlist, wishlistKey]);

    const toggleWishlist = (id) => {
        setWishlist(prev => 
            prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
        );
    };

    const isInWishlist = (id) => {
        return wishlist.includes(id);
    };

    const wishlistItems = shoes.filter(shoe => wishlist.includes(shoe.id || shoe._id));

    const removeFromWishlist = (id) => {
        setWishlist(prev => prev.filter(item => item !== id));
    };

    const clearWishlist = () => {
        setWishlist([]);
    };

    return (
        <ShoeContext.Provider value={{ 
            shoes, 
            isLoading, 
            toggleWishlist, 
            isInWishlist,
            wishlistItems,
            removeFromWishlist,
            clearWishlist
        }}>
            {children}
        </ShoeContext.Provider>
    );
};
