import { forwardRef } from "react";
import { motion } from "motion/react";
import { EASE_OUT } from "../motion/motionConfig";

const MotionButton = forwardRef(function MotionButton(
  {
    children,
    className = "",
    disabled = false,
    whileHover,
    whileTap,
    transition,
    ...props
  },
  ref
) {
  return (
    <motion.button
      ref={ref}
      disabled={disabled}
      className={className}
      whileHover={
        disabled
          ? undefined
          : (whileHover ?? { scale: 1.02, transition: { duration: 0.18, ease: EASE_OUT } })
      }
      whileTap={
        disabled
          ? undefined
          : (whileTap ?? { scale: 0.97, transition: { duration: 0.12, ease: EASE_OUT } })
      }
      transition={transition}
      {...props}
    >
      {children}
    </motion.button>
  );
});

export default MotionButton;
