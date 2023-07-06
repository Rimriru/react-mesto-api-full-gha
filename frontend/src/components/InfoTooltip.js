import React from "react";

export default function InfoTooltip({ isOpen, isSuccessful, onClose }) {
  return (
    <div className={`popup ${isOpen ? "popup_opened" : ""}`}>
      <div className="popup__container popup__container_type_tooltip">
        <div
          className={`popup__tooltip-image ${
            isSuccessful
              ? "popup__tooltip-image_status_successful"
              : "popup__tooltip-image_status_unsuccessful"
          }`}
        ></div>
        <h2 className="popup__tooltip-text">
          {isSuccessful
            ? "Вы успешно зарегистрировались!"
            : "Что-то пошло не так! Попробуйте ещё раз."}
        </h2>
        <button className="popup__close-button" onClick={onClose}></button>
      </div>
    </div>
  );
}
