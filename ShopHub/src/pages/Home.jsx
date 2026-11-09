import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import ProductCard from "../components/ProductCard";
import Reveal from "../components/Reveal";
import MotionButton from "../components/MotionButton";
import { getProducts } from "../data/products";
import {
  EASE_OUT,
  heroHeadingVariants,
  heroDescriptionVariants,
  heroCtaVariants,
  staggerContainer,
} from "../motion/motionConfig";

export default function Home() {
  const products = getProducts();
  const [exploreTrigger, setExploreTrigger] = useState(0);
  const [isLaserActive, setIsLaserActive] = useState(false);

  function handleExploreProducts(e) {
    if (e && e.preventDefault) e.preventDefault();

    setExploreTrigger((prev) => prev + 1);
    setIsLaserActive(true);

    const el = document.getElementById("products") || document.getElementById("products-section");
    if (el) {
      const prefersReduced =
        typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      el.scrollIntoView({
        behavior: prefersReduced ? "auto" : "smooth",
        block: "start",
      });
    }

    setTimeout(() => {
      setIsLaserActive(false);
    }, 1200);
  }

  return (
    <div className="page">
      <div className="home-hero">
        <motion.div
          className="home-hero-glow"
          animate={{
            scale: [1, 1.08, 1],
            opacity: [0.65, 0.85, 0.65],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <motion.h1
          className="home-title"
          variants={heroHeadingVariants}
          initial="initial"
          animate="animate"
        >
          Welcome to ShopHub
        </motion.h1>

        <motion.p
          className="home-subtitle"
          variants={heroDescriptionVariants}
          initial="initial"
          animate="animate"
        >
          Discover amazing products at great prices. Engineered for speed, craft, and seamless shopping.
        </motion.p>

        <motion.div
          className="home-cta-wrapper"
          variants={heroCtaVariants}
          initial="initial"
          animate="animate"
        >
          <MotionButton
            type="button"
            className="btn btn-primary btn-large explore-btn"
            onClick={handleExploreProducts}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.95 }}
          >
            <span>Explore Products</span>
            <motion.span
              className="explore-btn-arrow"
              animate={{ y: [0, 3, 0] }}
              transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
            >
              ↓
            </motion.span>
          </MotionButton>
        </motion.div>
      </div>

      <div className="container" id="products">
        <div className="products-heading-wrapper" id="products-section">
          <Reveal yOffset={16} duration={0.4}>
            <h2 className="page-title">
              <span>Our Products</span>
              <span className="products-count-tag">{products.length} Items</span>
            </h2>
          </Reveal>

          <AnimatePresence>
            {isLaserActive && (
              <motion.div
                className="explore-laser-beam"
                initial={{ scaleX: 0, opacity: 1 }}
                animate={{ scaleX: 1, opacity: [1, 1, 0] }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.85, ease: EASE_OUT }}
              />
            )}
          </AnimatePresence>
        </div>

        <motion.div
          className="product-grid"
          variants={staggerContainer(0.07, 0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.08 }}
        >
          {products.map((product, idx) => (
            <ProductCard
              product={product}
              key={product.id}
              index={idx}
              exploreTrigger={exploreTrigger}
            />
          ))}
        </motion.div>
      </div>
    </div>
  );
}
