import { motion } from "motion/react";
import { EASE_OUT } from "../motion/motionConfig";

export default function Reveal({
  children,
  delay = 0,
  duration = 0.5,
  yOffset = 20,
  className = "",
  style = {},
  viewport = { once: true, amount: 0.15 },
  staggerChildren = null,
}) {
  const variants = staggerChildren
    ? {
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: typeof staggerChildren === "number" ? staggerChildren : 0.08,
            delayChildren: delay,
          },
        },
      }
    : {
        hidden: { opacity: 0, y: yOffset },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration,
            delay,
            ease: EASE_OUT,
          },
        },
      };

  return (
    <motion.div
      className={className}
      style={style}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
    >
      {children}
    </motion.div>
  );
}
