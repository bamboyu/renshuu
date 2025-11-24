import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-dark.bg-gradient">
        <div className="container-fluid">
          <a className="navbar-brand ms-5 text-white text-opacity-75" href="/">
            Renshuu
          </a>
          <ul className="navbar-nav d-flex flex-row gap-2">
            <li className="nav-item">
              <Link to="/login" className="btn btn-outline-primary">
                Login
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/signup" className="btn btn-secondary">
                Signup
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
