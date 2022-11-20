import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();

  const user = JSON.parse(localStorage.getItem("user") as any);

  if (location.pathname === "/login" || location.pathname === "/signup")
    return null;

  return (
    <>
      <nav className="navbar">
        <div className="navbar-right-items">
          <div className="navbar-brand">
            <h1>React Kanban</h1>
          </div>
          <ul className="navbar-nav">
            <li className="navbar-item">
              <Link to="/workspace" className="navbar-link">
                Workspace
              </Link>
            </li>
          </ul>
        </div>
        <div className="navbar-account">
          <div className="navbar-my-account">
            <div className="account-image">
              <img src={user.profilePicture} alt="" />
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
