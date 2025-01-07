import { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { getToken } from "../utils/token";

function ItemModal({ activeModal, onClose, onDelete, card }) {
  const handleDelete = () => {
    onDelete(card, getToken);
    onClose();
  };

  const user = useContext(CurrentUserContext);
  const currentUser = user.currentUser.data;

  // Checking if the current user is the owner of the current clothing item
  const isOwn = card.owner === currentUser?._id;

  // Creating a variable which you'll then set in `className` for the delete button
  const itemDeleteButtonClassName = `modal__delete ${
    isOwn ? "" : "modal__delete_hidden"
  }`;

  return (
    <div className={`modal ${activeModal === "preview" && "modal_opened"}`}>
      <div className="modal__content modal__content_type_image">
        <button
          onClick={onClose}
          type="button"
          className="modal__close modal__close_type_image"
        ></button>
        <img
          src={card.imageUrl}
          alt="The clothing item selected."
          className="modal__image"
        />
        <div className="modal__footer">
          <h2 className="modal__caption">{card.name}</h2>
          <p className="modal__weather">Weather: {card.weather}</p>
          <button
            type="button"
            className={itemDeleteButtonClassName}
            onClick={handleDelete}
          >
            Delete Item
          </button>
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
