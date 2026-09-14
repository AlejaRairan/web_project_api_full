import logo from "../../images/logo.svg";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import menuIcon from "../../images/menuIcon.svg";
import { useState } from "react";
function Header({ isLoggedIn, userEmail, onLogout }) {
  const location = useLocation();
  const [isMenuOpen,  setIsMenuOpen] = useState(false);

  return (
    <header className="header">
      <div className="header__wrapper">
        <div className="header__wrapper-info">
        <h1 className="header__title">
          <img src={logo} alt="Logo" />
        </h1>

        <button
          className="header__menu-button"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Abrir menú"
        >
          <img src={menuIcon} alt="Menú" />
        </button>
        </div>

        <div className="header__nav">
          {isLoggedIn && (
            <div className={`header__nav-info ${isMenuOpen ? "header__nav-info_open" : ""}`}>
              <span className="header__nav-email">{userEmail}</span>
              <button
                className="header__nav-logout-button"
                onClick={onLogout}
              >
                Cerrar sesión
              </button>
            </div>
          )}
          {location.pathname === "/signin" && (
            <div className={`header__nav-info ${isMenuOpen ? "header__nav-info_open" : ""}`}>
            <Link to="/signup" className="header__nav-link">
              Registrarse
            </Link>
          </div>
        )}  
        {location.pathname === "/signup" && (
          <div className={`header__nav-info ${isMenuOpen ? "header__nav-info_open" : ""}`}>
            <Link to="/signin" className="header__nav-link">
              Iniciar sesión
            </Link>
            </div>
        )}
        </div>
      </div>
    </header>
  );
}
export default Header;
