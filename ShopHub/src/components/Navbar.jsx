import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { motion, useScroll, useMotionValueEvent } from "motion/react";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import { useToast } from "../context/ToastContext";
import { SPRING, EASE_OUT } from "../motion/motionConfig";
import MotionButton from "./MotionButton";

const MotionLink = motion.create(Link);

export default function Navbar() {
  const { user, logOut } = useAuth();
  const { cartItems } = useCart();
  const { toast } = useToast();
  const [isScrolled, setIsScrolled] = useState(false);

  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 20);
  });

  const totalCartCount = cartItems.reduce(
    (total, item) => total + (item.quantity || 0),
    0
  );

  function handleLogout() {
    logOut();
    toast.info("Logged out successfully");
  }

  return (
    <motion.nav
      initial={{ y: -16, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.35, ease: EASE_OUT }}
      className={`nav ${isScrolled ? "nav-scrolled" : ""}`}
    >
      <div className="navbar-container">
        <MotionLink
          to="/"
          className="navbar-brand"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          transition={{ duration: 0.15 }}
        >
          ShopHub
        </MotionLink>

        <div className="navbar-links">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `navbar-link ${isActive ? "active" : ""}`
            }
          >
            {({ isActive }) => (
              <>
                <span>Home</span>
                {isActive && (
                  <motion.div
                    layoutId="navbar-active-indicator"
                    className="navbar-active-indicator"
                    transition={SPRING.subtle}
                  />
                )}
              </>
            )}
          </NavLink>

          <NavLink
            to="/checkout"
            className={({ isActive }) =>
              `navbar-link ${isActive ? "active" : ""}`
            }
          >
            {({ isActive }) => (
              <>
                <span>Cart</span>
                {totalCartCount > 0 && (
                  <motion.span
                    key={totalCartCount}
                    initial={{ scale: 0.4, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.4, opacity: 0 }}
                    transition={SPRING.badge}
                    className="nav-cart-badge"
                  >
                    {totalCartCount}
                  </motion.span>
                )}
                {isActive && (
                  <motion.div
                    layoutId="navbar-active-indicator"
                    className="navbar-active-indicator"
                    transition={SPRING.subtle}
                  />
                )}
              </>
            )}
          </NavLink>
        </div>

        <div className="navbar-auth">
          {!user ? (
            <div className="navbar-auth-links">
              <MotionLink
                to="/auth"
                className="btn btn-secondary"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                transition={{ duration: 0.16 }}
              >
                Login
              </MotionLink>
              <MotionLink
                to="/auth"
                className="btn btn-primary"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                transition={{ duration: 0.16 }}
              >
                Sign up
              </MotionLink>
            </div>
          ) : (
            <div className="navbar-user">
              <span className="navbar-greeting">{user.email}</span>
              <MotionButton
                type="button"
                className="btn btn-secondary"
                onClick={handleLogout}
              >
                Log out
              </MotionButton>
            </div>
          )}
        </div>
      </div>
    </motion.nav>
  );
}
