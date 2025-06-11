export interface CartProduct {
  cartProductId: string;
  productId: string;
  color: string;
  size: string;
  quantity: number;
}

export interface CartContextI {
  products: Array<CartProduct>;
  addProduct: (product: {
    productId: string;
    color: string;
    size: string;
  }) => void;
  removeProduct: (cartProductId: string) => void;
  updateQuantity: (cartProductId: string, quantity: number) => void;
  quantity: number;
}
