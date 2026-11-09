import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { useCart } from "../context/CartContext";
import { useToast } from "../context/ToastContext";
import { EASE_OUT, SPRING, fadeInUp } from "../motion/motionConfig";
import MotionButton from "../components/MotionButton";
import OrderConfirmationModal from "../components/OrderConfirmationModal";

export default function Checkout() {
  const {
    getCartItemsWithProducts,
    removeFromCart,
    updateQuantity,
    getCartTotal,
    clearCart,
  } = useCart();
  const { toast } = useToast();
  const navigate = useNavigate();

  const [orderModalOpen, setOrderModalOpen] = useState(false);
  const [completedOrder, setCompletedOrder] = useState({ id: "", total: 0 });

  const cartItems = getCartItemsWithProducts();
  const total = getCartTotal();

  function placeOrder() {
    if (cartItems.length === 0) return;

    const orderId = "SH-" + Math.floor(100000 + Math.random() * 900000);
    const orderTotal = total;

    setCompletedOrder({ id: orderId, total: orderTotal });
    setOrderModalOpen(true);
    clearCart();
    toast.success("Order placed successfully!");
  }

  function handleRemove(item) {
    removeFromCart(item.id);
    toast.info(`Removed ${item.product.name} from cart`);
  }

  function handleCloseModal() {
    setOrderModalOpen(false);
    navigate("/");
  }

  return (
    <div className="page">
      <div className="container">
        <h1 className="page-title">Checkout</h1>

        <AnimatePresence mode="wait">
          {cartItems.length === 0 && !orderModalOpen ? (
            <motion.div
              key="empty-cart"
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="empty-cart-card"
            >
              <motion.div
                className="empty-cart-icon"
                animate={{ y: [0, -10, 0] }}
                transition={{ repeat: Infinity, duration: 2.8, ease: "easeInOut" }}
              >
                🛒
              </motion.div>
              <h2 className="empty-cart-title">Your cart is empty</h2>
              <p className="empty-cart-text">
                Looks like you haven't added anything to your cart yet. Discover our premium gear and essentials.
              </p>
              <Link to="/" className="btn btn-primary btn-large">
                Start Shopping
              </Link>
            </motion.div>
          ) : (
            <motion.div
              key="cart-content"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="checkout-container"
            >
              <div className="checkout-items">
                <h2 className="checkout-section-title">Order Summary</h2>

                <AnimatePresence mode="popLayout" initial={false}>
                  {cartItems.map((item) => (
                    <motion.div
                      className="checkout-item"
                      key={item.id}
                      layout
                      initial={{ opacity: 0, y: 14 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{
                        opacity: 0,
                        x: -30,
                        scale: 0.95,
                        transition: { duration: 0.22, ease: EASE_OUT },
                      }}
                      transition={{ duration: 0.25, ease: EASE_OUT }}
                    >
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="checkout-item-image"
                      />

                      <div className="checkout-item-details">
                        <h3 className="checkout-item-name">{item.product.name}</h3>
                        <p className="checkout-item-price">
                          ${item.product.price} each
                        </p>
                      </div>

                      <div className="checkout-item-controls">
                        <div className="quantity-controls">
                          <motion.button
                            type="button"
                            className="quantity-btn"
                            whileTap={{ scale: 0.88 }}
                            transition={{ duration: 0.1 }}
                            onClick={() =>
                              updateQuantity(item.id, item.quantity - 1)
                            }
                            aria-label={`Decrease quantity of ${item.product.name}`}
                          >
                            -
                          </motion.button>

                          <motion.span
                            key={item.quantity}
                            initial={{ scale: 1.25, color: "var(--neon-cyan)" }}
                            animate={{ scale: 1, color: "var(--text-primary)" }}
                            transition={SPRING.badge}
                            className="quantity-value"
                          >
                            {item.quantity}
                          </motion.span>

                          <motion.button
                            type="button"
                            className="quantity-btn"
                            whileTap={{ scale: 0.88 }}
                            transition={{ duration: 0.1 }}
                            onClick={() =>
                              updateQuantity(item.id, item.quantity + 1)
                            }
                            aria-label={`Increase quantity of ${item.product.name}`}
                          >
                            +
                          </motion.button>
                        </div>

                        <motion.p
                          key={item.product.price * item.quantity}
                          initial={{ scale: 1.05 }}
                          animate={{ scale: 1 }}
                          className="checkout-item-total"
                        >
                          ${(item.product.price * item.quantity).toFixed(2)}
                        </motion.p>

                        <MotionButton
                          type="button"
                          className="btn btn-secondary btn-small"
                          onClick={() => handleRemove(item)}
                          whileHover={{ scale: 1.04 }}
                          whileTap={{ scale: 0.94 }}
                        >
                          Remove
                        </MotionButton>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>

              <motion.div layout className="checkout-summary">
                <h2 className="checkout-section-title">Total</h2>

                <div className="checkout-total">
                  <p className="checkout-total-label">Subtotal:</p>
                  <p className="checkout-total-value">${total.toFixed(2)}</p>
                </div>

                <div className="checkout-total checkout-total-final">
                  <p className="checkout-total-label">Total:</p>
                  <motion.p
                    key={total}
                    initial={{ scale: 1.05 }}
                    animate={{ scale: 1 }}
                    transition={SPRING.badge}
                    className="checkout-total-value"
                  >
                    ${total.toFixed(2)}
                  </motion.p>
                </div>

                <MotionButton
                  type="button"
                  className="btn btn-primary btn-large btn-block"
                  onClick={placeOrder}
                  disabled={cartItems.length === 0}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                >
                  Place Order
                </MotionButton>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <OrderConfirmationModal
        isOpen={orderModalOpen}
        onClose={handleCloseModal}
        total={completedOrder.total}
        orderId={completedOrder.id}
      />
    </div>
  );
}
