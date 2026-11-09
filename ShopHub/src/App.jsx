import { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { motion, AnimatePresence, MotionConfig } from "motion/react";
import "./App.css";

import Home from "./pages/Home";
import Checkout from "./pages/Checkout";
import Auth from "./pages/Auth";
import ProductDetails from "./pages/ProductDetails";
import Navbar from "./components/Navbar";
import AuthProvider from "./context/AuthContext";
import CartProvider from "./context/CartContext";
import ToastProvider from "./context/ToastContext";
import { pageVariants } from "./motion/motionConfig";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname]);

  return null;
}

function App() {
  const location = useLocation();

  return (
    <MotionConfig reducedMotion="user">
      <AuthProvider>
        <CartProvider>
          <ToastProvider>
            <div className="app">
              <ScrollToTop />
              <Navbar />

              <main className="app-main">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={location.pathname}
                    variants={pageVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    className="page-transition-wrapper"
                  >
                    <Routes location={location} key={location.pathname}>
                      <Route path="/" element={<Home />} />
                      <Route path="/auth" element={<Auth />} />
                      <Route path="/checkout" element={<Checkout />} />
                      <Route path="/products/:id" element={<ProductDetails />} />
                      <Route
                        path="*"
                        element={
                          <div className="not-found-container">
                            <h1>Page not found</h1>
                          </div>
                        }
                      />
                    </Routes>
                  </motion.div>
                </AnimatePresence>
              </main>
            </div>
          </ToastProvider>
        </CartProvider>
      </AuthProvider>
    </MotionConfig>
  );
}

export default App;
