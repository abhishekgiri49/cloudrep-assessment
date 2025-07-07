import LocalStorageUtils from "@/src/apiService/LocalStorageUtils";
import { useEffect, useState } from "react";

export const useCart = () => {
  const [cart, setCart] = useState(
    () => LocalStorageUtils.getItem("cart") || []
  );

  // Update both localStorage and state
  const updateCart = (newCart: any) => {
    LocalStorageUtils.setItem("cart", newCart);
    setCart(newCart);
  };

  // Listen for storage events from other tabs
  useEffect(() => {
    const handleStorageChange = () => {
      setCart(LocalStorageUtils.getItem("cart") || []);
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  return { cart, updateCart };
};
