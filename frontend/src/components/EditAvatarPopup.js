import {useRef} from "react";
import PopupWithForm from "./PopupWithForm";

export default function EditAvatarPopup({ onUpdateAvatar, isOpen, onClose }) {
  const avatarRef = useRef(null);

  const handleSubmit = (evt) => {
    evt.preventDefault();
    onUpdateAvatar({
      avatar: avatarRef.current.value
    });
  }

  return (
    <PopupWithForm
        name="avatar"
        title="Обновить&nbsp;аватар"
        isOpen={isOpen}
        onClose={onClose}
        onSubmit={handleSubmit}
      >
        <input
          id="avatar"
          className="popup__person"
          type="url"
          name="avatar"
          placeholder="Ссылка на картинку"
          required
          ref={avatarRef}
        />
        <span className="popup__error avatar-error">#</span>
      </PopupWithForm>
  );
}