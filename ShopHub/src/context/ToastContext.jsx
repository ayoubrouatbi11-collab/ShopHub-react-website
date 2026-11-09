import { createContext, useContext, useState, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { EASE_OUT } from "../motion/motionConfig";

export const ToastContext = createContext(null);

export default function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const addToast = useCallback((message, type = "info", duration = 3200) => {
    const id = Date.now() + Math.random().toString(36).substring(2, 7);
    setToasts((prev) => [...prev, { id, message, type, duration }]);

    if (duration > 0) {
      setTimeout(() => {
        removeToast(id);
      }, duration);
    }
    return id;
  }, [removeToast]);

  const toast = useMemo(
    () => ({
      show: (msg, type, dur) => addToast(msg, type, dur),
      success: (msg, dur) => addToast(msg, "success", dur),
      info: (msg, dur) => addToast(msg, "info", dur),
      error: (msg, dur) => addToast(msg, "error", dur),
    }),
    [addToast]
  );

  return (
    <ToastContext.Provider value={{ toast, addToast, removeToast }}>
      {children}
      <div className="toast-portal" aria-live="polite" aria-atomic="true">
        <AnimatePresence mode="popLayout">
          {toasts.map((item) => (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0, y: -20, scale: 0.92 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{
                opacity: 0,
                scale: 0.9,
                y: -12,
                transition: { duration: 0.18, ease: EASE_OUT },
              }}
              transition={{ duration: 0.25, ease: EASE_OUT }}
              className={`toast-item toast-${item.type}`}
              role="alert"
            >
              <div className="toast-indicator" />
              <div className="toast-content">
                <span className="toast-icon">
                  {item.type === "success" ? "✓" : item.type === "error" ? "!" : "ℹ"}
                </span>
                <span className="toast-message">{item.message}</span>
              </div>
              <button
                type="button"
                className="toast-close"
                onClick={() => removeToast(item.id)}
                aria-label="Close notification"
              >
                ×
              </button>

              {item.duration > 0 && (
                <motion.div
                  className="toast-progress"
                  initial={{ scaleX: 1 }}
                  animate={{ scaleX: 0 }}
                  transition={{ duration: item.duration / 1000, ease: "linear" }}
                  style={{ transformOrigin: "left" }}
                />
              )}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    return {
      toast: {
        show: () => {},
        success: () => {},
        info: () => {},
        error: () => {},
      },
      addToast: () => {},
      removeToast: () => {},
    };
  }
  return context;
}
