import { useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { IoCaretDownOutline } from "react-icons/io5";

import "./styles.scss";

const Navbar = () => {
  const { pathname } = useLocation();
  const [dropdownIsOpen, setDropdownIsOpen] = useState(false);

  const dropdownMenu = useRef<HTMLUListElement>(null);

  return (
    <>
      <nav className="navbar">
        <div className="flex align-items-center justify-content-between">
          <div className="flex align-items-center">
            <div className="navbar-brand">
              <h1>V1NNI7</h1>
            </div>
            <ul className="navbar-nav">
              <li className="navbar-item">
                <Link className="navbar-link" to="/">
                  Inicio
                </Link>
              </li>
              <li className="navbar-item">
                <Link className="navbar-link" to="/boards">
                  Meus quadros
                </Link>
              </li>
              <li className="navbar-item">
                <Link className="navbar-link" to="/">
                  Contate-nos
                </Link>
              </li>
              <li className="navbar-item">
                <Link className="navbar-link" to="/">
                  Suporte
                </Link>
              </li>
              <li className="navbar-item">
                <Link className="navbar-link" to="/testes">
                  Testes
                </Link>
              </li>
            </ul>
          </div>
          <div
            className={`navbar-account ${
              pathname !== "/login" ? "dropdown" : ""
            } ${dropdownIsOpen ? "dropdown-open" : "dropdown-close"}`}
          >
            {pathname !== "/login" ? (
              <>
                <div
                  className="navbar-my-account dropdown-button"
                  onClick={() => setDropdownIsOpen(!dropdownIsOpen)}
                >
                  <div className="account-image"></div>
                  <IoCaretDownOutline />
                </div>
                <ul className="dropdown-items" ref={dropdownMenu}>
                  <li className="dropdown-item">Minha conta</li>
                  <li className="dropdown-item">Trocar senha</li>
                  <li className="dropdown-item">Configurações</li>
                </ul>
              </>
            ) : (
              <Link className="navbar-account-login" to="/login">
                Entrar
              </Link>
            )}
          </div>
        </div>
      </nav>
      {dropdownIsOpen ? (
        <div
          className="dropdown-backdrop"
          onClick={() => setDropdownIsOpen(!dropdownIsOpen)}
        ></div>
      ) : (
        <></>
      )}
    </>
  );
};

export default Navbar;
