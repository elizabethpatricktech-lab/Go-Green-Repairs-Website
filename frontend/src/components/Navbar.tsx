import "bootstrap/js/dist/dropdown";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const isLoggedIn = !!localStorage.getItem("access");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");

    navigate("/");
  };

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        {/* Logo */}
        <Link className="navbar-brand" to="/">
          Go Green Repairs
        </Link>

        {/* Mobile Toggle */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          {/* Left Side Navigation */}
          <ul className="navbar-nav">
            {/* Home Dropdown */}
            <li className="nav-item dropdown">
              <Link
                className="nav-link dropdown-toggle"
                to="/"
                role="button"
                data-bs-toggle="dropdown"
              >
                Home
              </Link>

              <ul className="dropdown-menu">
                <li>
                  <a className="dropdown-item" href="/#services">
                    Services
                  </a>
                </li>

                <li>
                  <a className="dropdown-item" href="/#finance">
                    Financing
                  </a>
                </li>

                <li>
                  <a className="dropdown-item" href="/#about-us">
                    About Us
                  </a>
                </li>

                <li>
                  <a className="dropdown-item" href="/#our-work">
                    Our Work
                  </a>
                </li>

                <li>
                  <a className="dropdown-item" href="/#reviews">
                    Reviews
                  </a>
                </li>
              </ul>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/brands">
                Brands
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/more-about-us">
                More About Us
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/financing">
                More About Financing
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/more-reviews">
                More Reviews
              </Link>
            </li>

            <li className="nav-item">
              <a className="nav-link" href="/#contact-us">
                Contact Us
              </a>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/privacy-policy">
                Privacy Policy
              </Link>
            </li>
          </ul>

          <ul className="navbar-nav ms-auto align-items-lg-center">
            {isLoggedIn ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/dashboard">
                    Dashboard
                  </Link>
                </li>

                <li className="nav-item ms-lg-2">
                  <button
                    className="btn btn-outline-success"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">
                    Login
                  </Link>
                </li>

                <li className="nav-item ms-lg-2">
                  <Link className="btn btn-success" to="/register">
                    Create Account
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
