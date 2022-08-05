import { Link } from "react-router-dom";

export const HomeNavbar = () => {
  return (
    <nav className="home-navbar">
      <div className="navbar-brand">
        <h1>{'<'}V1nni7{'/>'}</h1>
      </div>
      <ul className="navbar-nav">
        <li className="nav-item">
          <Link className="nav-link" to="/">
            Home
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/">
            Recursos
          </Link>
        </li>
      </ul>
      <div className="navbar-actions">
        <Link className="btn-redirect-login" to="/login">
          Entrar
        </Link>
        <Link className="btn-redirect-register" to="/register">
          Cadastro
        </Link>
      </div>
    </nav>
  )
}

export default HomeNavbar;