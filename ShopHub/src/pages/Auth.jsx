import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";
import { EASE_OUT, fadeInUp } from "../motion/motionConfig";
import MotionButton from "../components/MotionButton";

export default function Auth() {
  const [mode, setMode] = useState("sign up");
  const [error, setError] = useState(null);

  const { signUp, logIn } = useAuth();
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  function onSubmit(data) {
    setError(null);
    let result;
    if (mode === "sign up") {
      result = signUp(data.email, data.password);
      if (result.success === true) {
        toast.success("Account created successfully!");
        navigate("/");
      } else {
        setError(result.error);
      }
    } else {
      result = logIn(data.email, data.password);
      if (result.success === true) {
        toast.success("Signed in successfully!");
        navigate("/");
      } else {
        setError(result.error);
      }
    }
  }

  return (
    <div className="page">
      <div className="container">
        <motion.div
          className="auth-container"
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
        >
          <motion.h1
            key={mode}
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2, ease: EASE_OUT }}
            className="page-title"
          >
            {mode === "sign up" ? "Sign up" : "Login"}
          </motion.h1>

          <form className="auth-form" onSubmit={handleSubmit(onSubmit)}>
            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, height: 0, y: -6 }}
                  animate={{ opacity: 1, height: "auto", y: 0 }}
                  exit={{ opacity: 0, height: 0, y: -6 }}
                  transition={{ duration: 0.2 }}
                  className="error-message"
                >
                  {error}
                </motion.div>
              )}
            </AnimatePresence>

            <div className="form-group">
              <label className="form-label" htmlFor="email">
                Email
              </label>
              <input
                className="form-input"
                type="email"
                id="email"
                {...register("email", { required: "E-mail is required" })}
              />
              {errors.email && (
                <span className="form-error">{errors.email.message}</span>
              )}
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="password">
                Password
              </label>

              <input
                className="form-input"
                type="password"
                id="password"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password should be at least 6 characters",
                  },
                  maxLength: {
                    value: 12,
                    message: "Password should be less than 12 characters",
                  },
                })}
              />
              {errors.password && (
                <span className="form-error">{errors.password.message}</span>
              )}
            </div>

            <MotionButton
              type="submit"
              className="btn btn-primary btn-large btn-block"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
            >
              {mode === "sign up" ? "Create Account" : "Sign in"}
            </MotionButton>
          </form>

          <div className="auth-switch">
            {mode === "sign up" ? (
              <p>
                Already have an account?
                <span
                  role="button"
                  tabIndex={0}
                  className="auth-link"
                  onClick={() => {
                    setError(null);
                    setMode("login");
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      setError(null);
                      setMode("login");
                    }
                  }}
                >
                  Login
                </span>
              </p>
            ) : (
              <p>
                Don't have an account?
                <span
                  role="button"
                  tabIndex={0}
                  className="auth-link"
                  onClick={() => {
                    setError(null);
                    setMode("sign up");
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      setError(null);
                      setMode("sign up");
                    }
                  }}
                >
                  Sign up
                </span>
              </p>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
