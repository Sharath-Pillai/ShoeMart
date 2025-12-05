import { createContext, useContext, useEffect, useState, useMemo } from "react";
import { useAuth } from "./AuthContext";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const { user } = useAuth();
  const [cartItems, setCartItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch cart when user changes
  useEffect(() => {
    if (user) {
      fetchCart();
    } else {
      setCartItems([]);
    }
  }, [user]);

  const fetchCart = async () => {
    try {
      setIsLoading(true);
      const res = await fetch(`http://localhost:3000/cart?userId=${user.id}`);
      const data = await res.json();
      setCartItems(data);
    } catch (error) {
      console.error("Error fetching cart:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const addToCart = async (product, quantity = 1, selectedColor, selectedSize) => {
    if (!user) return;

    try {
      // Check if item already exists
      const existingItem = cartItems.find(
        (item) =>
          String(item.productId) === String(product.id) &&
          item.color === selectedColor &&
          item.size === selectedSize
      );

      if (existingItem) {
        const newQuantity = existingItem.quantity + quantity;
        await fetch(`http://localhost:3000/cart/${existingItem.id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ quantity: newQuantity }),
        });
      } else {
        await fetch("http://localhost:3000/cart", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userId: user.id,
            productId: product.id,
            productName: product.name,
            productPrice: product.price,
            productImage: product.imageURL,
            productBrand: product.brand,
            color: selectedColor,
            size: selectedSize,
            quantity: quantity,
          }),
        });
      }
      fetchCart();
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  const removeFromCart = async (id) => {
    try {
      await fetch(`http://localhost:3000/cart/${id}`, {
        method: "DELETE",
      });
      fetchCart();
    } catch (error) {
      console.error("Error removing from cart:", error);
    }
  };

  const updateQuantity = async (id, newQuantity) => {
    if (newQuantity < 1) return;
    try {
      await fetch(`http://localhost:3000/cart/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ quantity: newQuantity }),
      });
      fetchCart();
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  };

  const clearCart = async () => {
    try {
      for (const item of cartItems) {
        await fetch(`http://localhost:3000/cart/${item.id}`, {
          method: "DELETE",
        });
      }
      setCartItems([]);
    } catch (error) {
      console.error("Error clearing cart:", error);
    }
  };

  const cartCount = useMemo(
    () => cartItems.reduce((acc, item) => acc + item.quantity, 0),
    [cartItems]
  );

  const cartTotal = useMemo(
    () => cartItems.reduce((acc, item) => acc + item.productPrice * item.quantity, 0),
    [cartItems]
  );

  return (
    <CartContext.Provider
      value={{
        cartItems,
        isLoading,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartCount,
        cartTotal,
        fetchCart
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
