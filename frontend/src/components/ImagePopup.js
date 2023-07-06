import React from "react";

export default function ImagePopup({ card, onClose }) {
  return (
    <div className={`popup popup_type_card-image ${card ? "popup_opened" : ''}`}>
      <figure className="popup__image-container">
        <img className="popup__image" src={card && card.link} alt={card && card.name} />
        <figcaption className="popup__image-caption">{card && card.name}</figcaption>
        <button className="popup__close-button" onClick={onClose}></button>
      </figure>
    </div>
  );
}
