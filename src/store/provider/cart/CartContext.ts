import React from "react";

import { CartContextI } from "./types.ts";

const CartContext = React.createContext<CartContextI>({
  products: [],
  addProduct: () => {},
  removeProduct: () => {},
  updateQuantity: () => {},
  quantity: 0,
});

export default CartContext;
