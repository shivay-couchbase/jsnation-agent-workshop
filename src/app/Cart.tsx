import React from "react";

import { COLORS, PRODUCTS, Product, SIZES } from "../store/products.ts";
import { CartProduct } from "../store/provider/cart/types.ts";
import useCart from "../store/provider/cart/useCart.ts";
import CurrentPageContext from "../store/provider/pageContext/CurrentPageContext.tsx";
import { Button, Modal } from "../theme";
import CartItem from "./cart/CartItem.tsx";
import MainLayout from "./template/MainLayout.tsx";

const Cart: React.FC = () => {
  const { products } = useCart();
  const [modalOpen, setModalOpen] = React.useState<boolean>(false);

  const enhancedProducts: Array<{
    cartProduct: CartProduct;
    product: Product;
  }> = products
    .map((cartProduct) => {
      const product = PRODUCTS.find((p) => p.id === cartProduct.productId);
      return product
        ? {
            cartProduct,
            product,
          }
        : null;
    })
    .filter(Boolean) as Array<{ cartProduct: CartProduct; product: Product }>;

  const fullPrice = enhancedProducts.reduce(
    (acc, curr) => acc + curr.cartProduct.quantity * curr.product.price,
    0
  );

  return (
    <MainLayout title="Shopping Cart" wide>
      <CurrentPageContext title="Cart">
        {enhancedProducts.length !== 0 ? (
          <React.Fragment>
            <p>The following items are currently in the cart</p>
            <ul>
              {enhancedProducts.map((product) => {
                const productColor =
                  product.product.colors.length > 1
                    ? Object.entries(COLORS).find(
                        (color) => color[0] === product.cartProduct.color
                      )
                    : null;

                const productSize =
                  product.product.sizes.length > 1
                    ? Object.entries(SIZES).find(
                        (size) => size[0] === product.cartProduct.size
                      )
                    : null;

                const attributes = [];
                if (productColor) {
                  attributes.push("Color: " + productColor[1].label);
                }
                if (productSize) {
                  attributes.push("Size: " + productSize[1]);
                }

                const title =
                  product.cartProduct.quantity + "x " + product.product.name;

                const price =
                  "€ " + product.cartProduct.quantity * product.product.price;

                const attributesString = attributes.join(", ");

                return (
                  <li key={product.cartProduct.cartProductId}>
                    {[title, attributesString, price]
                      .filter(Boolean)
                      .join(" - ")}
                  </li>
                );
              })}
            </ul>
          </React.Fragment>
        ) : (
          <p>Your shopping cart is empty</p>
        )}
      </CurrentPageContext>
      <div className="lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16">
        <section aria-labelledby="cart-heading" className="lg:col-span-7">
          <h2 id="cart-heading" className="sr-only">
            Items in your shopping cart
          </h2>
          {enhancedProducts.length === 0 ? (
            <p>Your shopping cart is empty</p>
          ) : (
            <ul
              role="list"
              className="divide-y divide-gray-200 border-t border-b border-gray-200"
            >
              {enhancedProducts.map((product) => (
                <li
                  key={product.cartProduct.cartProductId}
                  className="flex py-6 sm:py-10"
                >
                  <CartItem fullProduct={product} />
                </li>
              ))}
            </ul>
          )}
        </section>
        <section
          aria-labelledby="summary-heading"
          className="mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8"
        >
          <h2
            id="summary-heading"
            className="text-lg font-medium text-gray-900"
          >
            Order summary
          </h2>
          <dl className="mt-6 space-y-4">
            <div className="flex items-center justify-between border-t border-gray-200 pt-4">
              <dt className="text-base font-medium text-gray-900">
                Order total
              </dt>
              <dd className="text-base font-medium text-gray-900">
                € {fullPrice}
              </dd>
            </div>
          </dl>

          <div className="mt-6">
            <Button onClick={() => setModalOpen(true)} className="w-full">
              Checkout
            </Button>
          </div>
        </section>
      </div>
      <Modal title="Demo store" open={modalOpen} setOpen={setModalOpen}>
        <p>This is a fake store. You cannot order</p>
      </Modal>
    </MainLayout>
  );
};

export default Cart;
