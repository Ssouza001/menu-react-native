import React, { createContext, useState, useMemo } from 'react';

export const CartContext = createContext();

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);

  const addToCart = (product, size = 'media', quantity = 1) => {
    setItems((prev) => {
      const index = prev.findIndex(
        (i) => i.id === product.id && i.size === size
      );

      if (index > -1) {
        const next = [...prev];
        next[index].quantity += quantity;
        return next;
      }

      return [
        ...prev,
        {
          id: product.id,
          nome: product.nome,
          size,
          quantity,
          precos: product.precos,
          imagem: product.imagem,
        },
      ];
    });
  };

  const removeFromCart = (productId, size) => {
    setItems((prev) =>
      prev.filter((i) => !(i.id === productId && i.size === size))
    );
  };

  const updateQuantity = (productId, size, quantity) => {
    setItems((prev) =>
      prev
        .map((i) =>
          i.id === productId && i.size === size ? { ...i, quantity } : i
        )
        .filter((i) => i.quantity > 0)
    );
  };

  const clearCart = () => setItems([]);

  const getTotal = () =>
    items.reduce((sum, item) => {
      const price =
        item.precos?.[item.size] !== undefined ? item.precos[item.size] : 0;
      return sum + price * item.quantity;
    }, 0);

  // 🔥 Agora count calcula sempre baseado no items atual
  const count = useMemo(() => {
    return items.reduce((sum, item) => sum + item.quantity, 0);
  }, [items]);

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getTotal,
        count,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export default CartContext;
