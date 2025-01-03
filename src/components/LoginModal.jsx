import { useEffect, useState } from "react";
import ModalWithForm from "./ModalWithForm";

function LoginModal({ isOpen, onLogin, onCloseModal }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    setEmail("");
    setPassword("");
  }, [isOpen]);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin({
      email: email,
      password: password,
    });
  };

  return (
    <ModalWithForm
      buttonText="Next"
      title="Sign-up"
      handleCloseClick={onCloseModal}
      isOpen={isOpen}
      onSubmit={handleSubmit}
    >
      <label htmlFor="email" className="modal__label">
        Email
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
        Password
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
    </ModalWithForm>
  );
}

export default LoginModal;
