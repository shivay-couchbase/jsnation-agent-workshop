import React from "react";
import { useParams } from "react-router";

import { PRODUCTS } from "../store/products.ts";
import ProductSingle from "./shop/ProductSingle.tsx";
import MainLayout from "./template/MainLayout.tsx";

const Products: React.FC = () => {
  const { id } = useParams();
  const product = PRODUCTS.find((p) => p.id === id);

  return (
    <MainLayout title={product?.name || "404"} wide>
      {product ? <ProductSingle product={product} /> : "Product not found"}
    </MainLayout>
  );
};

export default Products;
