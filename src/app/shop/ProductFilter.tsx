import React from "react";

import cn from "../../utils/classnames.ts";
import ProductFilterElement from "./ProductFilterElement.tsx";

const ProductFilter: React.FC<{ className?: string }> = ({
  className = "",
}) => {
  return (
    <aside className={cn(className)}>
      <h2 className="sr-only">Filters</h2>
      <form className="divide-y divide-gray-200">
        {["categories", "colors", "sizes"].map((type) => (
          <ProductFilterElement
            key={type}
            type={type as "categories" | "colors" | "sizes"}
            className="py-10 first:pt-0 last:pb-0"
          />
        ))}
      </form>
    </aside>
  );
};

export default ProductFilter;
