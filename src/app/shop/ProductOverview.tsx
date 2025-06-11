import React from "react";

import { Product } from "../../store/products.ts";
import cn from "../../utils/classnames.ts";
import ProductOverviewSingle from "./ProductOverviewSingle.tsx";

const ProductOverview: React.FC<{
  products: Array<Product>;
  className?: string;
}> = ({ products, className = "" }) => (
  <div
    className={cn(
      className,
      "grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-4 xl:gap-x-8"
    )}
  >
    <h2 className="sr-only">Products</h2>
    {products.map((product) => (
      <ProductOverviewSingle key={product.id} product={product} />
    ))}
  </div>
);

export default ProductOverview;
