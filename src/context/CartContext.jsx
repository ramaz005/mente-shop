import { createContext, useContext, useState, useEffect } from 'react';
import { db } from '../firebase/config';
import { doc, setDoc, getDoc } from 'firebase/firestore';

const CartContext = createContext();
const CART_DOC = 'guest_cart';

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const loadCart = async () => {
      try {
        const ref = doc(db, 'carts', CART_DOC);
        const snap = await getDoc(ref);
        if (snap.exists()) setCart(snap.data().items || []);
      } catch (e) {}
    };
    loadCart();
  }, []);

  const saveCart = async (newCart) => {
    try {
      await setDoc(doc(db, 'carts', CART_DOC), { items: newCart });
    } catch (e) {}
  };

  const addToCart = (product) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === product.id);
      const newCart = existing
        ? prev.map(i => i.id === product.id ? { ...i, qty: i.qty + 1 } : i)
        : [...prev, { ...product, qty: 1 }];
      saveCart(newCart);
      return newCart;
    });
  };

  const removeFromCart = (id) => {
    setCart(prev => {
      const newCart = prev.filter(i => i.id !== id);
      saveCart(newCart);
      return newCart;
    });
  };

  const updateQty = (id, qty) => {
    if (qty === 0) return removeFromCart(id);
    setCart(prev => {
      const newCart = prev.map(i => i.id === id ? { ...i, qty } : i);
      saveCart(newCart);
      return newCart;
    });
  };

  const clearCart = () => {
    setCart([]);
    saveCart([]);
  };

  const total = cart.reduce((sum, i) => sum + i.price_min * i.qty, 0);
  const count = cart.reduce((sum, i) => sum + i.qty, 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQty, clearCart, total, count }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);