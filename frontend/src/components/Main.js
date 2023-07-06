import React from "react";
import avatarPath from "../images/default-avatar.png";
import Card from "./Card.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

export default function Main({
  onEditAvatar,
  onEditProfile,
  onAddPlace,
  cards,
  onCardClick,
  onLikeClick,
  onRemoveClick,
}) {
  const currentUser = React.useContext(CurrentUserContext);

  const cardsElements = cards.map(card => {
    return (
      <Card
        card={card}
        key={card._id}
        onCardClick={onCardClick}
        onLikeClick={onLikeClick}
        onRemoveClick={onRemoveClick}
      />
    );
  });

  return (
    <>
      <main className="content">
        <section className="profile">
          <div className="profile__content">
            <button className="profile__avatar" onClick={onEditAvatar}>
              <img
                className="profile__avatar-image"
                src={currentUser.avatar ? currentUser.avatar : avatarPath}
                alt="Аватар пользователя"
              />
              <div className="profile__avatar-overlay">
                <div className="profile__avatar-icon"></div>
              </div>
            </button>
            <div className="profile__info">
              <div className="profile__container">
                <h1 className="profile__name">{currentUser.name}</h1>
                <button
                  className="profile__edit-button"
                  type="button"
                  onClick={onEditProfile}
                ></button>
              </div>
              <p className="profile__description">{currentUser.about}</p>
            </div>
          </div>
          <button
            className="profile__add-button"
            type="button"
            onClick={onAddPlace}
          ></button>
        </section>
        <section className="elements" aria-label="Карточки">
          {cardsElements}
        </section>
      </main>
    </>
  );
}
