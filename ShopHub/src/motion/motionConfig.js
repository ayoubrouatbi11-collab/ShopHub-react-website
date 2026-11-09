export const EASE_OUT = [0.16, 1, 0.3, 1];
export const EASE_IN_OUT = [0.4, 0, 0.2, 1];
export const EASE_SMOOTH = [0.25, 0.1, 0.25, 1];

export const DURATION = {
  buttonHover: 0.2,
  buttonPress: 0.14,
  micro: 0.22,
  cardHover: 0.28,
  entrance: 0.5,
  sectionReveal: 0.6,
  pageTransition: 0.24,
};

export const SPRING = {
  subtle: { type: "spring", stiffness: 400, damping: 30 },
  snappy: { type: "spring", stiffness: 500, damping: 28 },
  badge: { type: "spring", stiffness: 600, damping: 20 },
};

export const heroHeadingVariants = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      delay: 0,
      ease: EASE_OUT,
    },
  },
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      delay: 0,
      ease: EASE_OUT,
    },
  },
};

export const heroDescriptionVariants = {
  initial: { opacity: 0, y: 16 },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      delay: 0.15,
      ease: EASE_OUT,
    },
  },
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      delay: 0.15,
      ease: EASE_OUT,
    },
  },
};

export const heroCtaVariants = {
  initial: { opacity: 0, y: 14 },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.45,
      delay: 0.3,
      ease: EASE_OUT,
    },
  },
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.45,
      delay: 0.3,
      ease: EASE_OUT,
    },
  },
};

export const fadeInUp = {
  initial: { opacity: 0, y: 24 },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: DURATION.entrance,
      ease: EASE_OUT,
    },
  },
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: DURATION.entrance,
      ease: EASE_OUT,
    },
  },
  exit: {
    opacity: 0,
    y: -16,
    transition: {
      duration: DURATION.pageTransition,
      ease: EASE_OUT,
    },
  },
};

export const fadeIn = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: {
      duration: DURATION.entrance,
      ease: EASE_OUT,
    },
  },
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: DURATION.entrance,
      ease: EASE_OUT,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: DURATION.pageTransition,
      ease: EASE_OUT,
    },
  },
};

export const staggerContainer = (staggerChildren = 0.07, delayChildren = 0.05) => ({
  initial: { opacity: 1 },
  animate: {
    opacity: 1,
    transition: {
      staggerChildren,
      delayChildren,
    },
  },
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren,
      delayChildren,
    },
  },
});

export const pageVariants = {
  initial: {
    opacity: 0,
    y: 10,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: DURATION.pageTransition,
      ease: EASE_OUT,
    },
  },
  exit: {
    opacity: 0,
    y: -8,
    transition: {
      duration: 0.18,
      ease: EASE_OUT,
    },
  },
};

export const modalVariants = {
  backdrop: {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: 0.22, ease: EASE_OUT } },
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.22, ease: EASE_OUT } },
    exit: { opacity: 0, transition: { duration: 0.18, ease: EASE_OUT } },
  },
  dialog: {
    initial: { opacity: 0, scale: 0.94, y: 16 },
    animate: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.28,
        ease: EASE_OUT,
      },
    },
    hidden: { opacity: 0, scale: 0.94, y: 16 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.28,
        ease: EASE_OUT,
      },
    },
    exit: {
      opacity: 0,
      scale: 0.96,
      y: 10,
      transition: {
        duration: 0.18,
        ease: EASE_OUT,
      },
    },
  },
};
