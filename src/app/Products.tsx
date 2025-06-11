import { parseAsArrayOf, parseAsString, useQueryState } from "nuqs";
import React from "react";

import { PRODUCTS } from "../store/products.ts";
import CurrentPageContext from "../store/provider/pageContext/CurrentPageContext.tsx";
import haveCommonElement from "../utils/haveCommonElement.ts";
import objToXml from "../utils/objToXml.ts";
import ProductFilter from "./shop/ProductFilter.tsx";
import ProductOverview from "./shop/ProductOverview.tsx";
import MainLayout from "./template/MainLayout.tsx";

const Products: React.FC = () => {
  const [categories] = useQueryState(
    "categories",
    parseAsArrayOf(parseAsString).withDefault([])
  );
  const [colors] = useQueryState(
    "colors",
    parseAsArrayOf(parseAsString).withDefault([])
  );
  const [sizes] = useQueryState(
    "sizes",
    parseAsArrayOf(parseAsString).withDefault([])
  );

  const filteredProducts = React.useMemo(
    () =>
      PRODUCTS.filter((product) => {
        if (
          (categories || []).length > 0 &&
          !haveCommonElement(categories, product.categories)
        ) {
          return false;
        }
        if (
          (colors || []).length > 0 &&
          !haveCommonElement(colors, product.colors)
        ) {
          return false;
        }
        if (
          (sizes || []).length > 0 &&
          !haveCommonElement(sizes, product.sizes)
        ) {
          return false;
        }
        return true;
      }),
    [categories, colors, sizes]
  );

  return (
    <MainLayout title="Products" wide>
      <CurrentPageContext title="Products">
        <p>The overview of all Products</p>
        <p>Active Filter: {objToXml({ categories, colors, sizes })}</p>
      </CurrentPageContext>
      <div className="lg:grid lg:grid-cols-3 lg:gap-x-8 xl:grid-cols-4">
        <ProductFilter />
        <ProductOverview
          products={filteredProducts}
          className="self-baseline lg:col-span-2 xl:col-span-3"
        />
      </div>
    </MainLayout>
  );
};

export default Products;
