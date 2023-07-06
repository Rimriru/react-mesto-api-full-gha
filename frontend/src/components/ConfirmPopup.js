import React from "react";
import PopupWithForm from "./PopupWithForm";

export default function ConfirmPopup({ onConfirm, isOpen, onClose }) {
  const handleSubmit = (evt) => {
    evt.preventDefault();
    onConfirm();
  }

  return (
    <PopupWithForm
      name="confirm"
      title="Вы&nbsp;уверены?"
      textSubmitButton="Да"
      isConfirmPopup={true}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    />
  );
}
