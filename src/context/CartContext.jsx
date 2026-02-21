"use client";
import axios from "axios";
import React, { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [logedUserID, setLogedUserID] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [logedUserName, setLogedUserName] = useState("");
  const [totalAmount, setTotalAmount] = useState(0);

  // Fetch user ID
  useEffect(() => {
    axios
      .post("/api/getlogeduser")
      .then((response) => {
        console.log("response----->", response.data);

        setLogedUserID(response.data.id);
        setLogedUserName(response.data.name);
      })
      .catch((err) => console.log("User fetch error", err));
  }, []);

  // Load cart data from localStorage AFTER user ID is available
  useEffect(() => {
    if (logedUserID) {
      const storedItems = localStorage.getItem(`cartItems-${logedUserID}`);
      const storedCount = localStorage.getItem(`cartCount-${logedUserID}`);
      setCartItems(storedItems ? JSON.parse(storedItems) : []);
      setCartCount(storedCount ? parseInt(storedCount) : 0);
    }
  }, [logedUserID]);

  // Save to localStorage when cart changes
  useEffect(() => {
    if (logedUserID) {
      localStorage.setItem(
        `cartItems-${logedUserID}`,
        JSON.stringify(cartItems)
      );
      localStorage.setItem(`cartCount-${logedUserID}`, cartCount.toString());
    }
  }, [cartItems, cartCount, logedUserID]);

  const addToCart = (product) => {
    setCartItems((prev) => {
      const existingItem = prev.find((item) => item._id === product._id);

      if (existingItem) {
        return prev.map((item) =>
          item._id === product._id
            ? { ...item, quantity: (item.quantity || 1) + 1 }
            : item
        );
      } else {
        return [...prev, { ...product, quantity: 1 }];
      }
    });

    setCartCount((prev) => prev + 1);
  };

  const removeFromCart = (id) => {
    const updatedCart = cartItems
      .map((item) => {
        if (item._id === id) {
          // If more than 1 quantity, just decrease it
          if ((item.quantity || 1) > 1) {
            return { ...item, quantity: item.quantity - 1 };
          }
          // If quantity is 1, remove the item entirely
          return null;
        }
        return item;
      })
      .filter((item) => item !== null);

    // Recalculate the total cart count based on quantities
    const newCount = updatedCart.reduce(
      (total, item) => total + (item.quantity || 1),
      0
    );

    setCartItems(updatedCart);
    setCartCount(newCount);
  };

  const clearCart = () => {
    setCartItems([]);
    setCartCount(0);
  };

  //function to calculate total amount of cart items
  useEffect(() => {
    const totalPrice = cartItems.reduce((acc, item) => {
      return acc + item.productPrice * (item.quantity || 1);
    }, 0);

    setTotalAmount(totalPrice);
  }, [cartItems]);

  return (
    <CartContext.Provider
      value={{
        cartCount,
        setCartCount,
        addToCart,
        removeFromCart,
        clearCart,
        cartItems,
        setCartItems,
        logedUserName,
        totalAmount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
