import React, { useEffect } from 'react';
import PopupWithForm from './PopupWithForm';

export default function AddPlacePopup({ onAddPlace, isOpen, onClose }) {
  const [name, setName] = React.useState("");
  const [link, setLink] = React.useState("");

  useEffect(() => {
    setName("");
    setLink("");
  }, [isOpen]);

  const handleSubmit = (evt) => {
    evt.preventDefault();
    onAddPlace({
      name,
      link
    }, evt);
  }

  const handleInputNameChange = (evt) => {
    setName(evt.target.value);
  }

  const handleInputLinkChange = (evt) => {
    setLink(evt.target.value);
  }

  return (
    <PopupWithForm
        name="new-card"
        title="Новое&nbsp;место"
        textSubmitButton="Создать"
        isOpen={isOpen}
        onClose={onClose}
        onSubmit={handleSubmit}
      >
        <input
          id="card-name"
          className="popup__person"
          type="text"
          name="name"
          placeholder="Название"
          required
          minLength="2"
          maxLength="30"
          onChange={handleInputNameChange}
          value={name}
        />
        <span className="popup__error card-name-error">#</span>
        <input
          id="card-link"
          className="popup__person"
          type="url"
          name="link"
          placeholder="Ссылка на картинку"
          required
          onChange={handleInputLinkChange}
          value={link}
        />
        <span className="popup__error card-link-error">#</span>
      </PopupWithForm>
  );
}