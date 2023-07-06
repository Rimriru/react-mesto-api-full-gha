import { Link } from "react-router-dom";

export default function PageNotFound () {
  return (
    <div className="not-found">
      <p className="not-found__error">404</p>
      <p className="not-found__text">Увы, такой страницы пока нет</p>
      <Link to='/sign-in' className="not-found__link">К странице входа</Link>
    </div>
  )
}