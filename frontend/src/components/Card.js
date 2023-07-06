import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

export default function Card({ card, onCardClick, onLikeClick, onRemoveClick}) {
  const { name, _id, owner, link, likes } = card;
  const currentUser = React.useContext(CurrentUserContext);

  const isOwn = owner === currentUser._id;
  const isLiked = likes.some(like => like === currentUser._id);

  const handleCardClick = () => onCardClick(card);
  const handleLikeCardClick = () => onLikeClick(card);
  const handleRemoveButtonClick = () => {
    onRemoveClick(_id);
    console.log(_id);
  };

  return (
    <article className="element">
      <img className="element__image" src={link} alt={name} onClick={handleCardClick}/>
      <div className="element__container">
        <h2 className="element__name">{name}</h2>
        <div className="element__like-container">
          <button className={`element__like-button ${isLiked ? 'element__like-button_active' : ''}`} type="button" onClick={handleLikeCardClick}></button>
          <p className="element__likes-counter">{likes.length}</p>
        </div>
      </div>
      {isOwn && <button className="element__remove-button" type="button" onClick={handleRemoveButtonClick}></button>}
    </article>
  );
}
