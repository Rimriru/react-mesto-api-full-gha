import { Link } from "react-router-dom";

export default function AuthRegistrationForm({ isLogin, name, onSubmit, children,  }) {
  return(
    <div className="login">
      <h3 className="login__heading">{isLogin ? 'Вход' : 'Регистрация'}</h3>
      <form method="get" name={name} noValidate onSubmit={onSubmit}>
        {children}
        <button className="login__submit-button" type="submit">{isLogin ? 'Войти' : 'Зарегистрироваться'}</button>
      </form>
      {isLogin ? '' : <Link to='/sign-in' className="login__signup-link">Уже зарегистрированы? Войти</Link>}
    </div>
  );
}