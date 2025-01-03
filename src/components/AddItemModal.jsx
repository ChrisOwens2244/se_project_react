import { useState, useEffect } from "react";
import { getToken } from "../utils/token.js";
import ModalWithForm from "./ModalWithForm.jsx";

const AddItemModal = ({ isOpen, onAddItem, onCloseModal }) => {
  // declare state for each input field
  const [name, setName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [weather, setWeather] = useState("");

  // use a useEffect hook to reset the input field state to empty strings when
  // the modal is opened

  useEffect(() => {
    setName("");
    setImageUrl("");
    setWeather("");
  }, [isOpen]);

  // create onChange handlers corresponding to each state variable

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleUrlChange = (e) => {
    setImageUrl(e.target.value);
  };

  const handleWeatherChange = (e) => {
    setWeather(e.target.value);
  };

  function handleSubmit(e) {
    // prevent default behavior
    // call onAddItem with appropriate arguments
    e.preventDefault();
    onAddItem({ name: name, weather: weather, imageUrl: imageUrl }, getToken);
  }

  return (
    <ModalWithForm
      buttonText="Add garment"
      title="New garment"
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
      <label htmlFor="imageUrl" className="modal__label">
        Image
        <input
          type="text"
          className="modal__input"
          id="imageUrl"
          placeholder="Image URL"
          value={imageUrl}
          onChange={handleUrlChange}
          minLength="1"
          required
        />
      </label>
      <fieldset className="modal__radio-buttons">
        <legend className="modal__legend">Select the weather type:</legend>
        <div className="modal__radio-contents">
          <label htmlFor="hot" className="modal__label_type_radio">
            <input
              type="radio"
              className="modal__radio-input"
              id="hot"
              name="weather"
              value="hot"
              onChange={handleWeatherChange}
              required
            />
            Hot
          </label>
          <label htmlFor="warm" className="modal__label_type_radio">
            <input
              type="radio"
              className="modal__radio-input"
              id="warm"
              name="weather"
              value="warm"
              onChange={handleWeatherChange}
            />
            Warm
          </label>
          <label htmlFor="cold" className="modal__label_type_radio">
            <input
              type="radio"
              className="modal__radio-input"
              id="cold"
              name="weather"
              value="cold"
              onChange={handleWeatherChange}
            />
            Cold
          </label>
        </div>
      </fieldset>
    </ModalWithForm>
  );
};

export default AddItemModal;
