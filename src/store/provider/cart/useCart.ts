import React from "react";

import CartContext from "./CartContext.ts";

const useCart = () => {
  const cartContext = React.use(CartContext);
  if (!cartContext) {
    throw new Error("useCart must be used within a CartContextProvider");
  }
  return cartContext;
};

export default useCart;
