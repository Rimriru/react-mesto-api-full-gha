import React from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

export default function EditProfilePopup({ isOpen, onUpdateUser, onClose }) {
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");
  const currentUser = React.useContext(CurrentUserContext);

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen]);

  const handleNameInputChange = (evt) => {
    setName(evt.target.value);
  }

  const handleDescriptionInputChange = (evt) => {
    setDescription(evt.target.value);
  }

  const handleSubmit = (evt) => {
    evt.preventDefault();
    onUpdateUser({
      name,
      about: description
    });
  }

  return (
    <PopupWithForm
        name="profile"
        title="Редактировать&nbsp;профиль"
        isOpen={isOpen}
        onClose={onClose}
        onSubmit={handleSubmit}
      >
        <input
          id="name"
          className="popup__person"
          type="text"
          name="name"
          placeholder="Введите имя профиля"
          required
          minLength="2"
          maxLength="40"
          onChange={handleNameInputChange}
          value={isOpen && name}
        />
        <span className="popup__error name-error">#</span>
        <input
          id="description"
          className="popup__person"
          type="text"
          name="about"
          placeholder="Введите описание профиля"
          required
          minLength="2"
          maxLength="200"
          onChange={handleDescriptionInputChange}
          value={isOpen && description}
        />
        <span className="popup__error description-error">#</span>
      </PopupWithForm>
  )
}