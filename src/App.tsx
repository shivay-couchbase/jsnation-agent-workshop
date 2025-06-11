import { NuqsAdapter } from "nuqs/adapters/react-router/v7";
import React from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router";

import Cart from "./app/Cart.tsx";
import Faq from "./app/Faq.tsx";
import Home from "./app/Home.tsx";
import Page from "./app/Page.tsx";
import Product from "./app/Product.tsx";
import Products from "./app/Products.tsx";
import Chat from "./app/chat/Chat.tsx";
import Footer from "./app/template/Footer.tsx";
import Header from "./app/template/Header.tsx";
import CartContextProvider from "./store/provider/cart/CartContextProvider.tsx";
import PageContextProvider from "./store/provider/pageContext/PageContextProvider.tsx";
import combineProvider from "./utils/combineProvider";

const App: React.FC = () => {
  const { pathname } = useLocation();
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="bg-white">
      <Header />
      <main>
        <Routes>
          <Route path="cart" element={<Cart />} />
          <Route path="products" element={<Products />} />
          <Route path="products/:id" element={<Product />} />
          <Route path="services/faq" element={<Faq />} />
          <Route path=":p1">
            <Route index element={<Page />} />
            <Route path=":p2" element={<Page />} />
          </Route>
          <Route index element={<Home />} />
        </Routes>
      </main>
      <Footer />
      <Chat />
    </div>
  );
};

const Provider = combineProvider(
  NuqsAdapter,
  BrowserRouter,
  CartContextProvider,
  PageContextProvider
);

const ProviderApp = () => (
  <Provider>
    <App />
  </Provider>
);

export default ProviderApp;
