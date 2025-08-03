import { useState, useContext, createContext, useEffect } from "react";

const  CartContext  = createContext();
const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);

   useEffect(() => {
  try {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  } catch (err) {
    console.error("Error parsing cart from localStorage", err);
    setCart([]);
  }
}, []);


    return(
        <CartContext.Provider value={[cart, setCart]}>
            {children}
            </CartContext.Provider>
    );
};
// custom hooks

const useCart = () => useContext(CartContext);
export {useCart, CartProvider};