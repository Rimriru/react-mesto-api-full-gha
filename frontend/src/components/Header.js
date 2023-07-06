import { Link, Route, Routes } from "react-router-dom";

export default function Header({ onSignOut, userEmail }) {
  return (
    <header className="header">
      <div className="logo"></div>
      <div className="header__container">
        <Routes>
          <Route path="/" element={
            <>
              <p className="header__user-email">{userEmail}</p>
              <button
                className="header__nav-button"
                onClick={onSignOut}
                type="button"
              >
                Выйти
              </button>
            </>
          } />
          <Route
            path="/sign-up"
            element={
              <Link to="/sign-in" className="header__nav-link">
                Войти
              </Link>
            }
          />
          <Route
            path="/sign-in"
            element={
              <Link to="/sign-up" className="header__nav-link">
                Регистрация
              </Link>
            }
          />
        </Routes>
      </div>
    </header>
  );
}
