import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
export default function Auth() {
  const [mode, setMode] = useState("sign up");
  const [error, setError] = useState(null);

  const { signUp, logIn } = useAuth();

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
    } else {
      result = logIn(data.email, data.password);
    }
    if (result.success === true) {
      navigate("/");
    } else {
      setError(result.error);
    }
  }
  return (
    <div className="page">
      <div className="container">
        <div className="auth-container">
          <h1 className="page-title">
            {mode === "sign up" ? "Sign up" : "Login"}
          </h1>
          <form className="auth-form" onSubmit={handleSubmit(onSubmit)}>
            {error && <div className="error-message">{error}</div>}
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
                    message: "passwird should be at least 6 characters",
                  },
                  maxLength: {
                    value: 12,
                    message: "password should be less than 12 characters",
                  },
                })}
              />
              {errors.password && (
                <span className="form-error">{errors.password.message}</span>
              )}
            </div>
            <button type="submit" className="btn btn-primary btn large">
              {mode === "sign up" ? "Sign up" : "Login"}
            </button>
          </form>
          <div className="auth-switch">
            {mode === "sign up" ? (
              <p>
                Already have an account ?
                <span className="auth-link" onClick={() => setMode("login")}>
                  Login
                </span>
              </p>
            ) : (
              <p>
                Don't an account ?
                <span className="auth-link" onClick={() => setMode("sign up")}>
                  Sign up
                </span>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
