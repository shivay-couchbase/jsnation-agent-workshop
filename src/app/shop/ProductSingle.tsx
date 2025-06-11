import {
  CheckIcon,
  ClockIcon,
  StarIcon,
  XMarkIcon,
} from "@heroicons/react/20/solid";
import React from "react";
import { NavLink } from "react-router";

import {
  CATEGORIES,
  COLORS,
  Category,
  Color,
  DELIVERY_TIMES,
  Delivery,
  Product,
  SIZES,
  Size,
} from "../../store/products.ts";
import useCart from "../../store/provider/cart/useCart.ts";
import CurrentPageContext from "../../store/provider/pageContext/CurrentPageContext.tsx";
import { Button, Modal, RadioGroup } from "../../theme";
import cn from "../../utils/classnames.ts";
import objToXml from "../../utils/objToXml.ts";

const ProductSingle: React.FC<{
  product: Product;
  className?: string;
}> = ({ product, className = "" }) => {
  const { addProduct } = useCart();
  const [addedModal, setAddedModal] = React.useState<boolean>(false);
  const [selectedColor, setSelectedColor] = React.useState<Color>(
    product.colors[0]
  );
  const [selectedSize, setSelectedSize] = React.useState<Size>(
    product.sizes[0]
  );

  const productColors = Object.entries(COLORS).filter((color) =>
    product.colors.includes(color[0] as Color)
  );

  const productSizes = Object.entries(SIZES).filter((size) =>
    product.sizes.includes(size[0] as Size)
  );

  const mainCat = Object.entries(CATEGORIES).find(
    (cat) => cat[1].mainCat && product.categories.includes(cat[0] as Category)
  );

  const breadCrumbs = [
    { name: "Products", href: "/products" },
    ...(mainCat
      ? [
          {
            name: mainCat[1].label,
            href: `/products/?categories=${mainCat[0]}`,
          },
        ]
      : []),
    { name: product.name, href: `/products/${product.id}` },
  ];

  return (
    <div className={cn(className)}>
      <CurrentPageContext title={`Product: ${product.name}`}>
        <p>{objToXml(product)}</p>
      </CurrentPageContext>
      <nav aria-label="Breadcrumb">
        <ol role="list" className="flex items-center space-x-4">
          {breadCrumbs.map((crumb, i) => (
            <li key={i}>
              <div className="flex items-center">
                <NavLink
                  to={crumb.href}
                  className="mr-4 text-sm font-medium text-gray-900"
                >
                  {crumb.name}
                </NavLink>
                {i !== breadCrumbs.length - 1 && (
                  <svg
                    viewBox="0 0 6 20"
                    aria-hidden="true"
                    className="h-5 w-auto text-gray-300"
                  >
                    <path
                      d="M4.878 4.34H3.551L.27 16.532h1.327l3.281-12.19z"
                      fill="currentColor"
                    />
                  </svg>
                )}
              </div>
            </li>
          ))}
        </ol>
      </nav>
      <div className="mt-8 lg:grid lg:auto-rows-min lg:grid-cols-12 lg:gap-x-8">
        <div className="lg:col-span-5 lg:col-start-8">
          <div className="flex justify-between">
            <h1 className="text-xl font-medium text-gray-900">
              {product.name}
            </h1>
            <p className="text-xl font-medium text-gray-900">
              € {product.price}
            </p>
          </div>
          {Boolean(product.rating) && (
            <div className="mt-4">
              <h2 className="sr-only">Reviews</h2>
              <div className="flex items-center">
                <p className="text-sm text-gray-700">
                  {product.rating}
                  <span className="sr-only"> out of 5 stars</span>
                </p>
                <div className="ml-1 flex items-center">
                  {[0, 1, 2, 3, 4].map((rating) => (
                    <StarIcon
                      key={rating}
                      aria-hidden="true"
                      className={cn(
                        (product.rating || 0) > rating
                          ? "text-yellow-400"
                          : "text-gray-200",
                        "size-5 shrink-0"
                      )}
                    />
                  ))}
                </div>
                <div aria-hidden="true" className="ml-4 text-sm text-gray-300">
                  ·
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="mt-8 lg:col-span-7 lg:col-start-1 lg:row-span-3 lg:row-start-1 lg:mt-0">
          <h2 className="sr-only">Image</h2>
          <img
            alt={product.name}
            src={product?.image || "/products/rocket-hoodie.webp"}
            className="lg:col-span-2 lg:row-span-2"
          />
        </div>

        <div className="mt-8 lg:col-span-5">
          <form className="flex flex-col gap-8">
            {productColors.length > 1 && (
              <div>
                <h2 className="mb-2 text-sm font-medium text-gray-900">
                  Color
                </h2>
                <fieldset>
                  <RadioGroup
                    value={selectedColor}
                    onChange={(color) => setSelectedColor(color as Color)}
                    className="!flex items-center gap-4"
                    choices={productColors.map(([value, color]) => ({
                      value,
                      className:
                        "relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 focus:outline-hidden data-checked:ring-2 data-focus:data-checked:ring-3 data-focus:data-checked:ring-offset-1",
                      label: (
                        <span
                          aria-hidden="true"
                          className={cn(
                            color.hex,
                            "size-8 rounded-full border border-black/10"
                          )}
                          style={{ backgroundColor: color.hex }}
                        />
                      ),
                    }))}
                  />
                </fieldset>
              </div>
            )}
            {productSizes.length > 1 && (
              <div>
                <h2 className="mb-2 text-sm font-medium text-gray-900">Size</h2>
                <RadioGroup
                  value={selectedSize}
                  onChange={(size) => setSelectedSize(size as Size)}
                  choices={productSizes.map(([value, size]) => ({
                    value,
                    label: size,
                  }))}
                />
              </div>
            )}
            <Button
              disabled={product.delivery === Delivery.NOT_AVAILABLE}
              onClick={(e) => {
                e.preventDefault();
                setAddedModal(true);
                addProduct({
                  productId: product.id,
                  color: selectedColor,
                  size: selectedSize,
                });
              }}
            >
              {product.delivery === Delivery.NOT_AVAILABLE
                ? DELIVERY_TIMES[product.delivery]
                : "Add to cart"}
            </Button>
          </form>

          {Boolean(product?.description) && (
            <div className="mt-10">
              <h2 className="text-sm font-medium text-gray-900">Description</h2>

              <div
                dangerouslySetInnerHTML={{
                  __html: product?.description || "",
                }}
                className="mt-4 space-y-4 text-sm/6 text-gray-500"
              />
            </div>
          )}
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
        <Modal
          open={addedModal}
          setOpen={setAddedModal}
          title="Added to cart"
          type="success"
          actions={[
            {
              to: "/cart",
              children: "View Cart",
            },
            {
              onClick: () => setAddedModal(false),
              children: "Continue",
            },
          ]}
        >
          <p>"{product.name}" was successfully added to your shopping cart</p>
        </Modal>
      </div>
    </div>
  );
};

export default ProductSingle;
