import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logOut } = useAuth();
  return (
    <nav className="nav">
      <div className="navbar-container">
        <Link to="/" className="navbar-brand">
          ShopHub
        </Link>

        <div className="navbar-links">
          <Link to="/" className="navbar-link">
            Home
          </Link>
          <Link to="/checkout" className="navbar-link">
            Cart
          </Link>
        </div>
        <div className="navbar-auth">
          {!user ? (
            <div className="navbar-auth-links">
              <Link to="/auth" className="btn btn-secondary">
                Login
              </Link>
              <Link to="/auth" className="btn btn-primary">
                Sign up
              </Link>
            </div>
          ) : (
            <div className="navbar-user">
              <span className="navbar-greeting">{user.email}</span>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={logOut}
              >
                Log out
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
