import { useNavigate, useParams, Link } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { getProductById } from "../data/products";
import { useCart } from "../context/CartContext";
import { useToast } from "../context/ToastContext";
import { EASE_OUT, SPRING, fadeInUp, staggerContainer } from "../motion/motionConfig";
import MotionButton from "../components/MotionButton";

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart, cartItems } = useCart();
  const { toast } = useToast();

  const [quantity, setQuantity] = useState(1);
  const [justAdded, setJustAdded] = useState(false);
  const [zoomStyle, setZoomStyle] = useState({ transformOrigin: "center center", scale: 1 });
  const imageWrapRef = useRef(null);

  const product = getProductById(id);

  useEffect(() => {
    if (!product) {
      navigate("/");
    }
  }, [product, navigate]);

  if (!product) {
    return (
      <div className="page">
        <div className="container" style={{ textAlign: "center", padding: "4rem 0" }}>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="loading-text"
          >
            Loading product details...
          </motion.div>
        </div>
      </div>
    );
  }

  const productInCart = cartItems.find((item) => item.id === product.id);

  function handleMouseMove(e) {
    if (!imageWrapRef.current) return;
    const rect = imageWrapRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setZoomStyle({
      transformOrigin: `${x}% ${y}%`,
      scale: 1.08,
    });
  }

  function handleMouseLeave() {
    setZoomStyle({
      transformOrigin: "center center",
      scale: 1,
    });
  }

  function handleAddToCart() {
    for (let i = 0; i < quantity; i++) {
      addToCart(product.id);
    }
    toast.success(`Added ${quantity} × ${product.name} to cart`);
    setJustAdded(true);
    setTimeout(() => {
      setJustAdded(false);
    }, 1200);
  }

  return (
    <div className="page">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.25 }}
          className="product-detail-back"
        >
          <Link to="/" className="back-link">
            <motion.span
              className="back-arrow"
              whileHover={{ x: -4 }}
              transition={{ duration: 0.15 }}
            >
              ←
            </motion.span>
            <span>Back to Products</span>
          </Link>
        </motion.div>

        <div className="product-detail">
          <motion.div
            ref={imageWrapRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="product-detail-image-wrap"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: EASE_OUT }}
          >
            <motion.img
              src={product.image}
              alt={product.name}
              className="product-detail-image"
              animate={zoomStyle}
              transition={{ duration: 0.25, ease: EASE_OUT }}
            />
            <div className="product-detail-badge">In Stock</div>
          </motion.div>

          <motion.div
            className="product-detail-content"
            initial="hidden"
            animate="visible"
            variants={staggerContainer(0.08, 0.1)}
          >
            <motion.div variants={fadeInUp} className="product-status-tag">
              <span className="status-dot-pulse" />
              <span>Available for Immediate Dispatch</span>
            </motion.div>

            <motion.h1 className="product-detail-name" variants={fadeInUp}>
              {product.name}
            </motion.h1>

            <motion.p className="product-detail-price" variants={fadeInUp}>
              ${product.price.toFixed(2)}
            </motion.p>

            <motion.p className="product-detail-description" variants={fadeInUp}>
              {product.description}
            </motion.p>

            <motion.div variants={fadeInUp} className="product-detail-actions-row">
              <div className="detail-quantity-controls">
                <motion.button
                  type="button"
                  className="quantity-btn"
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  aria-label="Decrease quantity"
                >
                  -
                </motion.button>
                <motion.span
                  key={quantity}
                  initial={{ scale: 1.25 }}
                  animate={{ scale: 1 }}
                  transition={SPRING.badge}
                  className="quantity-value"
                >
                  {quantity}
                </motion.span>
                <motion.button
                  type="button"
                  className="quantity-btn"
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setQuantity((q) => q + 1)}
                  aria-label="Increase quantity"
                >
                  +
                </motion.button>
              </div>

              <MotionButton
                type="button"
                className="btn btn-primary btn-large detail-add-btn"
                onClick={handleAddToCart}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.96 }}
              >
                <AnimatePresence mode="wait">
                  {justAdded ? (
                    <motion.span
                      key="added"
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: 0.15 }}
                    >
                      ✓ Added to Cart!
                    </motion.span>
                  ) : (
                    <motion.span
                      key="add"
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: 0.15 }}
                    >
                      Add to Cart {quantity > 1 ? `(${quantity})` : ""}
                      {productInCart && (
                        <span className="product-btn-qty">
                          • In Cart: {productInCart.quantity}
                        </span>
                      )}
                    </motion.span>
                  )}
                </AnimatePresence>
              </MotionButton>
            </motion.div>

            <motion.div variants={fadeInUp} className="product-trust-badges">
              <div className="trust-badge-item">
                <span className="trust-badge-icon">🚚</span>
                <div>
                  <strong>Free Express Shipping</strong>
                  <p>On all domestic orders over $50</p>
                </div>
              </div>
              <div className="trust-badge-item">
                <span className="trust-badge-icon">🛡️</span>
                <div>
                  <strong>30-Day Money-Back Guarantee</strong>
                  <p>Hassle-free return policy</p>
                </div>
              </div>
              <div className="trust-badge-item">
                <span className="trust-badge-icon">⚡</span>
                <div>
                  <strong>2-Year Warranty Included</strong>
                  <p>Full manufacturer warranty coverage</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
