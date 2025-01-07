import { useEffect, useState } from "react";
import ModalWithForm from "./ModalWithForm";

function RegisterModal({ isOpen, onRegister, onCloseModal, handleSwitch }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [avatarURL, setAvatarURL] = useState("");

  useEffect(() => {
    setEmail("");
    setPassword("");
    setName("");
    setAvatarURL("");
  }, [isOpen]);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleAvatarChange = (e) => {
    setAvatarURL(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onRegister({
      email: email,
      password: password,
      name: name,
      avatar: avatarURL,
    });
  };

  return (
    <ModalWithForm
      buttonText="Next"
      title="Sign-up"
      handleCloseClick={onCloseModal}
      isOpen={isOpen}
      onSubmit={handleSubmit}
      isAuth={true}
      switchText="Log In"
      onSwitch={handleSwitch}
    >
      <label htmlFor="email" className="modal__label">
        Email*
        <input
          type="email"
          className="modal__input"
          id="email"
          placeholder="Email"
          value={email}
          onChange={handleEmailChange}
          minLength="1"
          required
        />
      </label>
      <label htmlFor="password" className="modal__label">
        Password*
        <input
          type="password"
          className="modal__input"
          id="password"
          placeholder="Password"
          value={password}
          onChange={handlePasswordChange}
          minLength="1"
          maxLength="39"
          required
        />
      </label>
      <label htmlFor="name" className="modal__label">
        Name
        <input
          type="text"
          className="modal__input"
          id="name"
          placeholder="Name"
          value={name}
          onChange={handleNameChange}
          maxLength="39"
        />
      </label>
      <label htmlFor="avatar_url" className="modal__label">
        Avatar
        <input
          type="text"
          className="modal__input"
          id="avatar_url"
          placeholder="Avatar URL"
          value={avatarURL}
          onChange={handleAvatarChange}
        />
      </label>
    </ModalWithForm>
  );
}

export default RegisterModal;
