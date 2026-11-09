import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { modalVariants } from "../motion/motionConfig";
import MotionButton from "./MotionButton";

const PARTICLES = [
  { id: 1, angle: 0, distance: 75, color: "var(--neon-purple)", size: 8 },
  { id: 2, angle: 40, distance: 85, color: "var(--neon-cyan)", size: 6 },
  { id: 3, angle: 75, distance: 90, color: "var(--neon-green)", size: 9 },
  { id: 4, angle: 110, distance: 70, color: "var(--neon-purple-bright)", size: 7 },
  { id: 5, angle: 145, distance: 95, color: "var(--neon-cyan)", size: 6 },
  { id: 6, angle: 180, distance: 80, color: "var(--neon-green)", size: 8 },
  { id: 7, angle: 215, distance: 90, color: "var(--neon-purple)", size: 7 },
  { id: 8, angle: 250, distance: 75, color: "var(--neon-cyan)", size: 8 },
  { id: 9, angle: 290, distance: 85, color: "var(--neon-green)", size: 6 },
  { id: 10, angle: 325, distance: 95, color: "var(--neon-purple-bright)", size: 8 },
  { id: 11, angle: 20, distance: 60, color: "var(--neon-cyan)", size: 5 },
  { id: 12, angle: 200, distance: 65, color: "var(--neon-purple)", size: 6 },
];

export default function OrderConfirmationModal({ isOpen, onClose, total, orderId }) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === "Escape") {
        onClose();
      }
    }
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
      return () => {
        window.removeEventListener("keydown", handleKeyDown);
        document.body.style.overflow = "unset";
      };
    }
  }, [isOpen, onClose]);

  function handleCopyOrderId() {
    if (orderId) {
      navigator.clipboard?.writeText(orderId);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="modal-root"
          role="dialog"
          aria-modal="true"
          aria-labelledby="order-success-title"
        >
          <motion.div
            className="modal-backdrop"
            variants={modalVariants.backdrop}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={onClose}
          />

          <div className="modal-dialog-wrapper">
            <motion.div
              className="modal-card"
              variants={modalVariants.dialog}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <div className="modal-badge-wrapper">
                {PARTICLES.map((p) => {
                  const rad = (p.angle * Math.PI) / 180;
                  const targetX = Math.cos(rad) * p.distance;
                  const targetY = Math.sin(rad) * p.distance;
                  return (
                    <motion.div
                      key={p.id}
                      className="modal-confetti-particle"
                      style={{
                        backgroundColor: p.color,
                        width: p.size,
                        height: p.size,
                      }}
                      initial={{ x: 0, y: 0, scale: 0, opacity: 1 }}
                      animate={{
                        x: targetX,
                        y: targetY,
                        scale: [0, 1.2, 0],
                        opacity: [1, 1, 0],
                      }}
                      transition={{
                        delay: 0.18,
                        duration: 0.85,
                        ease: "easeOut",
                      }}
                    />
                  );
                })}

                <motion.div
                  className="modal-check-icon"
                  initial={{ scale: 0, rotate: -45 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{
                    delay: 0.15,
                    type: "spring",
                    stiffness: 500,
                    damping: 22,
                  }}
                >
                  ✓
                </motion.div>
              </div>

              <h2 id="order-success-title" className="modal-title">
                Order Confirmed!
              </h2>

              <p className="modal-desc">
                Thank you for your purchase. We've received your order and are preparing it for express dispatch.
              </p>

              <div className="modal-summary-box">
                <div className="modal-summary-row">
                  <span className="modal-summary-label">Order Number</span>
                  <div className="modal-order-copy-wrap">
                    <span className="modal-summary-val font-mono">{orderId}</span>
                    <button
                      type="button"
                      className="modal-copy-btn"
                      onClick={handleCopyOrderId}
                      title="Copy order number"
                    >
                      {copied ? "✓ Copied" : "Copy"}
                    </button>
                  </div>
                </div>
                <div className="modal-summary-row">
                  <span className="modal-summary-label">Total Paid</span>
                  <span className="modal-summary-val font-mono highlight">
                    ${total?.toFixed(2)}
                  </span>
                </div>
              </div>

              <div className="modal-actions">
                <MotionButton
                  type="button"
                  className="btn btn-primary btn-block btn-large"
                  onClick={onClose}
                >
                  Continue Shopping
                </MotionButton>
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}
