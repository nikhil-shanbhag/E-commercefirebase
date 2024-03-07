import React, { createContext, useState, useEffect } from "react";
import all_product from "../assets/all_product";
import { db, getCurrentUser, auth } from "../Services/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";

export const ShopContext = createContext(null);

const getDefaultCart = () => {
  let cart = {};
  for (let index = 0; index <= 300; index++) {
    cart[index] = 0;
  }
  return cart;
};

const ShopContextProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(getDefaultCart());

  const fetchCartFromFirebase = async () => {
    const userId = getCurrentUser();
    if (!userId) {
      console.log("No user is signed in");
      return;
    }

    try {
      const docRef = doc(db, "carts", userId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setCartItems(docSnap.data().cartItems);
      } else {
        console.log("No cart exists for the user");
      }
    } catch (error) {
      console.error("Error reading document: ", error);
    }
  };

  const updateCart = (itemId, operation) => {
    setCartItems((prev) => {
      const newCartItems = { ...prev, [itemId]: operation(prev[itemId]) };
      fetchCartFromFirebase(newCartItems);
      return newCartItems;
    });
  };

  const addToCart = (itemId) => updateCart(itemId, (prev) => prev + 1);
  const removeFromCart = (itemId) => updateCart(itemId, (prev) => prev - 1);

  const calculateTotal = (operation) => {
    let total = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = all_product.find(
          (product) => product.id === Number(item)
        );
        total += operation(itemInfo, cartItems[item]);
      }
    }
    return total;
  };

  const getTotalCartAmount = () =>
    calculateTotal((itemInfo, quantity) => itemInfo.new_price * quantity);
  const getTotalCartItems = () => calculateTotal((_, quantity) => quantity);

  useEffect(() => {
    const userId = auth.currentUser?.uid;
    if (userId) {
      fetchCartFromFirebase();
    }
  }, []);

  useEffect(() => {
    const userId = auth.currentUser?.uid;
    if (userId) {
      const docRef = doc(db, "carts", userId);
      setDoc(docRef, { cartItems });
    }
  }, [cartItems]);

  const contextValue = {
    fetchCartFromFirebase,
    getTotalCartItems,
    getTotalCartAmount,
    all_product,
    cartItems,
    addToCart,
    removeFromCart,
  };

  return (
    <ShopContext.Provider value={contextValue}>{children}</ShopContext.Provider>
  );
};

export default ShopContextProvider;
