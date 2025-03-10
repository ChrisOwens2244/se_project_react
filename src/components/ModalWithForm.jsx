function ModalWithForm({
  children,
  buttonText,
  title,
  handleCloseClick,
  isOpen,
  onSubmit,
  isAuth,
  switchText,
  onSwitch,
}) {
  const swicthButtonName = isAuth
    ? "modal__switch-btn"
    : "modal__switch-btn modal__switch-btn_hidden";
  return (
    <div className={`modal ${isOpen && "modal_opened"}`}>
      <div className="modal__content">
        <h2 className="modal__title">{title}</h2>
        <button
          onClick={handleCloseClick}
          type="button"
          className="modal__close"
        />
        <form className="modal__form" onSubmit={onSubmit}>
          {children}
          <div className="modal__buttons">
            <button type="submit" className="modal__submit">
              {buttonText}
            </button>
            <button
              type="button"
              className={swicthButtonName}
              onClick={onSwitch}
            >
              or {switchText}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
