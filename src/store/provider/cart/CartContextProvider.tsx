import React from "react";

import CartContext from "./CartContext.ts";
import { CartProduct } from "./types.ts";

const CartContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [products, setProducts] = React.useState<Array<CartProduct>>([]);
  const [init, setInit] = React.useState<boolean>(false);

  const addProduct = (product: {
    productId: string;
    color: string;
    size: string;
  }) => {
    const id = JSON.stringify(product);
    const existingProduct = products.find(
      (cartProduct) => cartProduct.cartProductId === id
    );
    setProducts((prev) =>
      existingProduct
        ? prev.map((product) =>
            product.cartProductId === id
              ? {
                  ...product,
                  quantity: product.quantity + 1,
                }
              : product
          )
        : [...prev, { ...product, cartProductId: id, quantity: 1 }]
    );
  };

  const removeProduct = (cartProductId: string) =>
    setProducts((prev) =>
      prev.filter((product) => product.cartProductId !== cartProductId)
    );

  React.useMemo(() => {
    if (init) window.localStorage.setItem("cart", JSON.stringify(products));
  }, [products, init]);

  React.useMemo(() => {
    setProducts(JSON.parse(window.localStorage.getItem("cart") || "[]"));
    setInit(true);
  }, []);

  return (
    <CartContext
      value={{
        products,
        addProduct,
        removeProduct,
        updateQuantity: (cartProductId: string, quantity: number) =>
          setProducts((prev) =>
            prev.map((product) =>
              product.cartProductId === cartProductId
                ? { ...product, quantity }
                : product
            )
          ),
        quantity: products.reduce((acc, product) => acc + product.quantity, 0),
      }}
    >
      {children}
    </CartContext>
  );
};

export default CartContextProvider;
