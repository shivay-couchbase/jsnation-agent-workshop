import React from "react";
import { NavLink } from "react-router";

import { COLORS, Product, SIZES } from "../../store/products.ts";
import cn from "../../utils/classnames.ts";

const ProductMetas: React.FC<{
  product: Product;
  className?: string;
}> = ({ product, className = "" }) => {
  const sizes =
    product.sizes.length > 1
      ? `${product.sizes.length} Sizes`
      : product.sizes.length < 1
        ? null
        : SIZES[product.sizes[0]];

  const colors =
    product.colors.length > 1
      ? `${product.colors.length} Colors`
      : product.colors.length < 1
        ? null
        : COLORS[product.colors[0]].label;

  return (
    <p className={cn(className)}>
      {[sizes, colors].filter(Boolean).join(", ")}
    </p>
  );
};

const ProductOverviewSingle: React.FC<{
  product: Product;
  className?: string;
}> = ({ product, className = "" }) => (
  <div
    className={cn(
      className,
      "group relative flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white"
    )}
  >
    <img
      alt={product.name}
      src={product.image}
      className="aspect-square bg-gray-200 object-cover group-hover:opacity-75"
    />
    <div className="flex flex-1 flex-col space-y-2 p-4">
      <h3 className="text-sm font-medium text-gray-900">
        <NavLink to={`/products/${product.id}`}>
          <span aria-hidden="true" className="absolute inset-0" />
          {product.name}
        </NavLink>
      </h3>
      {/*<p className="text-sm text-gray-500">{product.description}</p>*/}
      <div className="flex flex-1 flex-col justify-end">
        <ProductMetas
          className="text-sm text-gray-500 italic"
          product={product}
        />
        <p className="text-base font-medium text-gray-900">€ {product.price}</p>
      </div>
    </div>
  </div>
);

export default ProductOverviewSingle;
