import React from "react";
import { NavLink, Link } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../context/auth";
import '../../Header.css';
import { useCart } from "../context/Cart";
import { FaHeart, FaShoppingCart  } from "react-icons/fa";

const Header = () => {
  const [cart] = useCart();

  const [auth, setAuth] = useAuth();
  

  const handleLogout = () => {
    setAuth({
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
    toast.success("Logout Successfully");
  };

  return (
    <nav className="navbar navbar-expand-sm bg-dark navbar-dark p-3">
      <div className="container-fluid">
        <Link to="/" className="navbar-brand">
          ECOMMERCE APP
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#collapsibleNavbar"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="collapsibleNavbar">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <NavLink to="/" className="nav-link">
                HOME
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/contactus" className="nav-link">
                ContactUs
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/aboutus" className="nav-link">
                AboutUs
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/category" className="nav-link">
                Category
              </NavLink>
            </li>


            <li className="nav-item">
              <NavLink to="/dashboard/user/WishlistPage" className="nav-link">
                <FaHeart style={{ marginRight: "5px" }} />
                
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink to="/cart" className="nav-link d-flex align-items-center">
                <FaShoppingCart size={18} />
                {cart.length > 0 && (
                  <span className="badge bg-danger ms-1">{cart.length}</span>
                )}
              </NavLink>
            </li>

            {!auth?.user ? (
              <>
                <li className="nav-item">
                  <NavLink to="/register" className="nav-link">
                    Register
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/login" className="nav-link">
                    Login
                  </NavLink>
                </li>

              </>
            ) : (
              <li className="nav-item dropdown dropdown-left">
                <NavLink
                  to="#"
                  className="nav-link dropdown-toggle"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  onClick={(e) => e.preventDefault()}
                >
                  {auth.user.name}
                </NavLink>
                <ul className="dropdown-menu">
                  <li>
                    <NavLink
                      to={`/dashboard/${auth.user.role === 1 ? "admin" : "user"}`}
                      className="dropdown-item"
                    >
                      Dashboard
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/login"
                      onClick={handleLogout}
                      className="dropdown-item"
                    >
                      Logout
                    </NavLink>
                  </li>
                </ul>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;


