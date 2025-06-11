import { ChevronDownIcon } from "@heroicons/react/16/solid";
import { CheckIcon, ClockIcon, XMarkIcon } from "@heroicons/react/20/solid";
import React from "react";
import { NavLink } from "react-router";

import {
  COLORS,
  DELIVERY_TIMES,
  Delivery,
  Product,
  SIZES,
} from "../../store/products.ts";
import { CartProduct } from "../../store/provider/cart/types.ts";
import useCart from "../../store/provider/cart/useCart.ts";
import cn from "../../utils/classnames.ts";

const CartItem: React.FC<{
  className?: string;
  fullProduct: { cartProduct: CartProduct; product: Product };
}> = ({ className = "", fullProduct }) => {
  const { updateQuantity, removeProduct } = useCart();
  const { product, cartProduct } = fullProduct;

  const productColor =
    product.colors.length > 1
      ? Object.entries(COLORS).find((color) => color[0] === cartProduct.color)
      : null;

  const productSize =
    product.sizes.length > 1
      ? Object.entries(SIZES).find((size) => size[0] === cartProduct.size)
      : null;

  return (
    <div className={cn(className, "flex w-full")}>
      <div className="shrink-0">
        <img
          alt={product.name}
          src={product?.image || "/products/rocket-hoodie.webp"}
          className="size-24 rounded-md object-cover sm:size-48"
        />
      </div>

      <div className="ml-4 flex flex-1 flex-col justify-between sm:ml-6">
        <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
          <div>
            <div className="flex justify-between">
              <h3 className="text-sm">
                <NavLink
                  to={`/products/${product.id}`}
                  className="font-medium text-gray-700 hover:text-gray-800"
                >
                  {product.name}
                </NavLink>
              </h3>
            </div>
            <div className="mt-1 flex text-sm">
              {productColor && (
                <p className="text-gray-500">{productColor[1].label}</p>
              )}
              {productSize && (
                <p className="ml-4 border-l border-gray-200 pl-4 text-gray-500">
                  {productSize[1]}
                </p>
              )}
            </div>
            <p className="mt-1 text-sm font-medium text-gray-900">
              € {product.price}
            </p>
          </div>

          <div className="mt-4 sm:mt-0 sm:pr-9">
            <div className="grid w-full max-w-16 grid-cols-1">
              <select
                name={`quantity-${cartProduct.cartProductId}`}
                aria-label={`Quantity, ${product.name}`}
                className="col-start-1 row-start-1 appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                onChange={(e) =>
                  updateQuantity(
                    cartProduct.cartProductId,
                    Number(e.target.value)
                  )
                }
                value={cartProduct.quantity}
              >
                {[...Array(8)].map((_, i) => (
                  <option key={i} value={i + 1}>
                    {i + 1}
                  </option>
                ))}
              </select>
              <ChevronDownIcon
                aria-hidden="true"
                className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4"
              />
            </div>

            <div className="absolute top-0 right-0">
              <button
                type="button"
                className="-m-2 inline-flex p-2 text-gray-400 hover:text-gray-500"
                onClick={() => removeProduct(cartProduct.cartProductId)}
              >
                <span className="sr-only">Remove</span>
                <XMarkIcon aria-hidden="true" className="size-5" />
              </button>
            </div>
          </div>
        </div>

        <p className="mt-4 flex space-x-2 text-sm text-gray-700">
          {product.delivery === Delivery.IN_STOCK ? (
            <CheckIcon
              aria-hidden="true"
              className="size-5 shrink-0 text-green-500"
            />
          ) : product.delivery === Delivery.NOT_AVAILABLE ? (
            <XMarkIcon
              aria-hidden="true"
              className="size-5 shrink-0 text-red-300"
            />
          ) : (
            <ClockIcon
              aria-hidden="true"
              className="size-5 shrink-0 text-gray-300"
            />
          )}

          <span>{DELIVERY_TIMES[product.delivery]}</span>
        </p>
      </div>
    </div>
  );
};

export default CartItem;
