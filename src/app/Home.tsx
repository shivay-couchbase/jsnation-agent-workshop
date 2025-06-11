import React from "react";
import { NavLink } from "react-router";

import { CATEGORIES, Category, PRODUCTS } from "../store/products.ts";
import CurrentPageContext from "../store/provider/pageContext/CurrentPageContext.tsx";
import { Button } from "../theme";
import cn from "../utils/classnames.ts";
import ProductOverview from "./shop/ProductOverview.tsx";

const Products: React.FC = () => {
  return (
    <div className="bg-white">
      <CurrentPageContext title="Home">
        <p>The Homepage</p>
      </CurrentPageContext>
      <div className="relative border-b border-gray-200">
        <div
          aria-hidden="true"
          className="absolute hidden h-full w-1/2 bg-gray-50 lg:block"
        />
        <div className="relative bg-gray-100 px-4 sm:px-6 lg:bg-transparent lg:px-8">
          <div className="mx-auto max-w-7xl lg:grid lg:grid-cols-2">
            <div className="mx-auto max-w-2xl py-24 lg:max-w-none lg:py-64">
              <div className="lg:pr-16">
                <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl xl:text-6xl">
                  Welcome to the Emoji-Store
                </h1>
                <p className="mt-4 text-xl text-gray-600">
                  Find awesome Products for your daily life.
                </p>
                <div className="mt-6">
                  <Button to="/products">View Products</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="h-48 w-full sm:h-64 lg:absolute lg:top-0 lg:right-0 lg:h-full lg:w-1/2">
          <img alt="" src="./intro.webp" className="size-full object-cover" />
        </div>
      </div>
      {Object.entries(CATEGORIES).map(([slug, { label }], i) => (
        <div
          className={cn(
            "border-b border-gray-200 px-4 py-12 last:border-b-0 sm:px-6 sm:py-18 lg:px-8",
            i % 2 !== 0 ? "bg-gray-50" : ""
          )}
          key={slug}
        >
          <div className="mx-auto max-w-7xl">
            <div className="md:flex md:items-center md:justify-between">
              <h2 className="text-2xl font-bold tracking-tight text-gray-900">
                {label}
              </h2>
              <NavLink
                to={`/products?categories=${slug}`}
                className="hidden text-sm font-medium text-indigo-600 hover:text-indigo-500 md:block"
              >
                Shop the collection
                <span aria-hidden="true"> &rarr;</span>
              </NavLink>
            </div>
            <ProductOverview
              className="mt-8"
              products={PRODUCTS.filter((product) =>
                product.categories.includes(slug as Category)
              )
                .sort(() => Math.random() - 0.5)
                .slice(0, 4)}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default Products;
