import React from 'react';

export default function PopupWithForm({ isOpen, isConfirmPopup, title, name, onSubmit, children, textSubmitButton, onClose }) {
  return (
    <div className={`popup popup_type_${name} ${isOpen ? "popup_opened" : ""}`}>
        <div className="popup__container">
          <h2 className={`popup__heading ${isConfirmPopup && "popup__heading_type_confirm"}`}>{title}</h2>
          <form
            className={`popup__form popup__form_type_${name}`}
            method="get"
            name={`popup-form-${name}`}
            noValidate
            onSubmit={onSubmit}
          >
            {children}
            <button className={`popup__submit-button ${isConfirmPopup && "popup__submit-button_type_confirm"}`} type="submit">{textSubmitButton || 'Сохранить'}</button>
          </form>
          <button className="popup__close-button" onClick={onClose}></button>
        </div>
      </div>
  ) 
}