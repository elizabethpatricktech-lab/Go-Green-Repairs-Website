import "bootstrap/js/dist/dropdown";
import "bootstrap/js/dist/dropdown";

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <a className="navbar-brand" href="/">
          Go Green Repairs
        </a>

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
          <ul className="navbar-nav">
            {/* HOME DROPDOWN */}
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="/"
                data-bs-toggle="dropdown"
              >
                Home
              </a>
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
            {/* FULL PAGES */}
            <li className="nav-item">
              <a className="nav-link" href="/brands">
                Brands
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/more-about-us">
                More About Us
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/financing">
                More About Financing
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/more-reviews">
                More Reviews
              </a>
            </li>
            {/* CONTACT (SCROLLS href HOME PAGE CONTACT SECTION) */}
            <li className="nav-item">
              <a className="nav-link" href="/#contact-us">
                Contact Us
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/privacy-policy">
                Privacy Policy
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
