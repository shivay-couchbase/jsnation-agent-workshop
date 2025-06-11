import React from "react";
import { NavLink } from "react-router";

import { PAGES } from "../../store/pages.ts";
import { CATEGORIES } from "../../store/products.ts";
import { Logo } from "../../theme";

const Footer: React.FC = () => (
  <footer aria-labelledby="footer-heading" className="bg-gray-50">
    <h2 id="footer-heading" className="sr-only">
      Footer
    </h2>
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="border-t border-gray-200 py-20">
        <div className="grid grid-cols-1 md:grid-flow-col md:auto-rows-min md:grid-cols-12 md:gap-x-8 md:gap-y-16">
          {/* Image section */}
          <div className="col-span-1 md:col-span-2 lg:col-start-1 lg:row-start-1">
            <Logo className="h-8 w-auto" />
          </div>

          {/* Sitemap sections */}
          <div className="col-span-6 mt-10 grid grid-cols-2 gap-8 sm:grid-cols-3 md:col-span-8 md:col-start-3 md:row-start-1 md:mt-0 lg:col-span-6 lg:col-start-2">
            <div className="grid grid-cols-1 gap-y-12 sm:col-span-2 sm:grid-cols-2 sm:gap-x-8">
              <div>
                <h3 className="text-sm font-medium text-gray-900">
                  <NavLink to="/products">Products</NavLink>
                </h3>
                <ul role="list" className="mt-6 space-y-6">
                  {Object.entries(CATEGORIES)
                    .map(([slug, { label }]) => ({
                      name: label,
                      href: `/products?categories=${slug}`,
                    }))
                    .map((item) => (
                      <li key={item.name} className="text-sm">
                        <NavLink
                          to={item.href}
                          className="text-gray-500 hover:text-gray-600"
                        >
                          {item.name}
                        </NavLink>
                      </li>
                    ))}
                </ul>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-900">
                  <NavLink to="company">{PAGES.company.title}</NavLink>
                </h3>
                <ul role="list" className="mt-6 space-y-6">
                  {Object.entries(PAGES.company.pages).map(([id, page]) => (
                    <li key={id} className="text-sm">
                      <NavLink
                        to={`company/${id}`}
                        className="text-gray-500 hover:text-gray-600"
                      >
                        {page.title}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-900">
                <NavLink to="company">{PAGES.services.title}</NavLink>
              </h3>
              <ul role="list" className="mt-6 space-y-6">
                {Object.entries(PAGES.services.pages).map(([id, page]) => (
                  <li key={id} className="text-sm">
                    <NavLink
                      to={`services/${id}`}
                      className="text-gray-500 hover:text-gray-600"
                    >
                      {page.title}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-100 py-10 text-center">
        <p className="text-sm text-gray-500">
          &copy; {new Date().getFullYear()} - This is a fake store. Please do
          not order.
        </p>
      </div>
    </div>
  </footer>
);

export default Footer;
