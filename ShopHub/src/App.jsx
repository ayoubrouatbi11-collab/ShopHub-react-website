import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Checkout from "./pages/Checkout";
import Auth from "./pages/Auth";
import Navbar from "./components/Navbar";
import AuthProvider from "./context/AuthContext";
import ProductDetails from "./pages/ProductDetails";

function App() {
  return (
    <AuthProvider>
      <div className="app">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/products/:id" element={<ProductDetails />} />

          <Route
            path="*"
            element={
              <div style={{ fontSize: "70px", textAlign: "center" }}>
                Page not found
              </div>
            }
          />
        </Routes>
      </div>
    </AuthProvider>
  );
}

export default App;
