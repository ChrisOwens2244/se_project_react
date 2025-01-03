import { useEffect, useState } from "react";
import ModalWithForm from "./ModalWithForm";

function EditProfileModal({ isOpen, onEdit, onCloseModal }) {
  const [name, setName] = useState("");
  const [avatar, setAvatarURL] = useState("");

  useEffect(() => {
    setName("");
    setAvatarURL("");
  }, [isOpen]);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleAvatarChange = (e) => {
    setAvatarURL(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onEdit({
      name: name,
      avatar: avatar,
    });
    onCloseModal();
  };

  return (
    <ModalWithForm
      buttonText="Save Changes"
      title="Edit profile"
      handleCloseClick={onCloseModal}
      isOpen={isOpen}
      onSubmit={handleSubmit}
    >
      <label htmlFor="name" className="modal__label">
        Name
        <input
          type="text"
          className="modal__input"
          id="name"
          placeholder="Name"
          value={name}
          onChange={handleNameChange}
          minLength="1"
          maxLength="39"
          required
        />
      </label>
      <label htmlFor="avatar_url" className="modal__label">
        Avatar
        <input
          type="text"
          className="modal__input"
          id="avatar_url"
          placeholder="Avatar URL"
          value={avatar}
          onChange={handleAvatarChange}
          minLength="1"
        />
      </label>
    </ModalWithForm>
  );
}

export default EditProfileModal;
