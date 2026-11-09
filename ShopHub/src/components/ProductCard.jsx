import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { useCart } from "../context/CartContext";
import { useToast } from "../context/ToastContext";
import { EASE_OUT, SPRING } from "../motion/motionConfig";
import MotionButton from "./MotionButton";

const MotionLink = motion.create(Link);

export default function ProductCard({ product, index = 0, exploreTrigger = 0 }) {
  const { addToCart, cartItems } = useCart();
  const { toast } = useToast();
  const [justAdded, setJustAdded] = useState(false);
  const [isPulsing, setIsPulsing] = useState(false);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const cardRef = useRef(null);

  const productInCart = cartItems.find((item) => item.id === product.id);

  useEffect(() => {
    if (exploreTrigger > 0) {
      const delay = index * 75;
      const timer = setTimeout(() => {
        setIsPulsing(true);
        const resetTimer = setTimeout(() => {
          setIsPulsing(false);
        }, 900);
        return () => clearTimeout(resetTimer);
      }, delay);
      return () => clearTimeout(timer);
    }
  }, [exploreTrigger, index]);

  function handleMouseMove(e) {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    cardRef.current.style.setProperty("--mouse-x", `${x}px`);
    cardRef.current.style.setProperty("--mouse-y", `${y}px`);

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -3.5;
    const rotateY = ((x - centerX) / centerX) * 3.5;
    setRotate({ x: rotateX, y: rotateY });
  }

  function handleMouseLeave() {
    setRotate({ x: 0, y: 0 });
  }

  function handleAddToCart() {
    addToCart(product.id);
    toast.success(`Added ${product.name} to cart`);
    setJustAdded(true);
    setTimeout(() => {
      setJustAdded(false);
    }, 1100);
  }

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`product-card ${isPulsing ? "explore-pulse" : ""}`}
      style={{
        transform: `perspective(900px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`,
        transition: "transform 0.18s cubic-bezier(0.16, 1, 0.3, 1)",
      }}
      variants={{
        hidden: { opacity: 0, y: 24 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.5, ease: EASE_OUT },
        },
      }}
      whileHover={{
        y: -7,
        transition: { duration: 0.24, ease: EASE_OUT },
      }}
      whileTap={{
        scale: 0.985,
        transition: { duration: 0.12 },
      }}
    >
      <div className="product-card-image-wrap">
        <img
          src={product.image}
          alt={product.name}
          className="product-card-image"
          loading="lazy"
          decoding="async"
        />
        <div className="product-card-sheen" />
      </div>

      <div className="product-card-content">
        <h3 className="product-card-name">{product.name}</h3>
        <p className="product-card-price">${product.price.toFixed(2)}</p>

        <div className="product-card-actions">
          <MotionLink
            className="btn btn-secondary"
            to={`/products/${product.id}`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            transition={{ duration: 0.15 }}
          >
            View Details
          </MotionLink>

          <MotionButton
            type="button"
            className="btn btn-primary"
            onClick={handleAddToCart}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.96 }}
            transition={{ duration: 0.15 }}
          >
            <AnimatePresence mode="wait">
              {justAdded ? (
                <motion.span
                  key="just-added"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.14 }}
                >
                  ✓ Added
                </motion.span>
              ) : (
                <motion.span
                  key="default-label"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.14 }}
                >
                  Add to Cart
                  {productInCart && (
                    <motion.span
                      key={productInCart.quantity}
                      initial={{ scale: 0.6, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={SPRING.badge}
                      className="product-btn-qty"
                    >
                      ({productInCart.quantity})
                    </motion.span>
                  )}
                </motion.span>
              )}
            </AnimatePresence>
          </MotionButton>
        </div>
      </div>
    </motion.div>
  );
}
