import { createContext, useEffect, useMemo, useState } from "react";

const STORAGE_KEY = "shoemart:wishlist";
const ShoeContext = createContext();

const ShoeProvider = ({ children }) => {
  const [shoesData, setShoesData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [wishlistIds, setWishlistIds] = useState(() => {
    if (typeof window === "undefined") {
      return [];
    }
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    let isMounted = true;
    const fetchShoes = async () => {
      try {
        setIsLoading(true);
        const response = await fetch("http://localhost:3000/products");
        if (!response.ok) {
          throw new Error("We couldn't load the catalog right now.");
        }
        const data = await response.json();
        if (isMounted) {
          setShoesData(data || {});
          setError(null);
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message || "Unexpected error while loading catalog.");
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchShoes();

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(wishlistIds));
    } catch {
      // ignore storage errors
    }
  }, [wishlistIds]);

  const shoes = useMemo(() => Object.values(shoesData || {}), [shoesData]);

  const shoesById = useMemo(() => {
    const map = new Map();
    shoes.forEach((item) => {
      if (item?.id != null) {
        map.set(String(item.id), item);
      }
    });
    return map;
  }, [shoes]);

  const wishlistItems = useMemo(
    () => wishlistIds.map((id) => shoesById.get(id)).filter(Boolean),
    [wishlistIds, shoesById]
  );

  const toggleWishlist = (productId) => {
    setWishlistIds((prev) => {
      const normalizedId = String(productId);
      if (prev.includes(normalizedId)) {
        return prev.filter((id) => id !== normalizedId);
      }
      return [...prev, normalizedId];
    });
  };

  const removeFromWishlist = (productId) => {
    setWishlistIds((prev) => prev.filter((id) => id !== String(productId)));
  };

  const clearWishlist = () => setWishlistIds([]);

  const isInWishlist = (productId) =>
    wishlistIds.includes(String(productId ?? -1));

  return (
    <ShoeContext.Provider
      value={{
        shoesData,
        shoes,
        isLoading,
        error,
        wishlistIds,
        wishlistItems,
        toggleWishlist,
        removeFromWishlist,
        clearWishlist,
        isInWishlist,
      }}
    >
      {children}
    </ShoeContext.Provider>
  );
};

export { ShoeProvider, ShoeContext };