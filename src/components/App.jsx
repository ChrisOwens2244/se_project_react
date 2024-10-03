import { useState, useEffect } from "react";

import Header from "./Header.jsx";
import Footer from "./Footer.jsx";
import Main from "./Main.jsx";
import ModalWithForm from "./ModalWithForm.jsx";
import ItemModal from "./ItemModal.jsx";
import { getWeather, filterWeatherData } from "../utils/weatherApi.js";
import { coordinates, APIkey } from "../utils/constants.js";

function App() {
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { f: 999 },
    city: "",
  });
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});

  const handleAddClick = () => {
    setActiveModal("add-garment");
  };

  const handleItemClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const closeActiveModal = () => {
    setActiveModal("");
  };

  useEffect(() => {
    getWeather(coordinates, APIkey)
      .then((data) => {
        const filteredData = filterWeatherData(data);
        setWeatherData(filteredData);
      })
      .catch(console.error);
  }, []);

  return (
    <div className="page">
      <div className="page__content">
        <Header handleAddClick={handleAddClick} weatherData={weatherData} />
        <Main weatherData={weatherData} handleCardClick={handleItemClick} />
        <Footer />
      </div>
      <ModalWithForm
        buttonText="Add garment"
        title="New garment"
        handleCloseClick={closeActiveModal}
        isOpen={activeModal === "add-garment"}
      >
        <label htmlFor="name" className="modal__label">
          Name{" "}
          <input
            type="text"
            className="modal__input"
            id="name"
            placeholder="Name"
          />
        </label>
        <label htmlFor="imageUrl" className="modal__label">
          Image{" "}
          <input
            type="text"
            className="modal__input"
            id="imageUrl"
            placeholder="Image URL"
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
              />
              Hot
            </label>
            <label htmlFor="warm" className="modal__label_type_radio">
              <input
                type="radio"
                className="modal__radio-input"
                id="warm"
                name="weather"
              />
              Warm
            </label>
            <label htmlFor="cold" className="modal__label_type_radio">
              <input
                type="radio"
                className="modal__radio-input"
                id="cold"
                name="weather"
              />
              Cold
            </label>
          </div>
        </fieldset>
      </ModalWithForm>
      <ItemModal
        activeModal={activeModal}
        onClose={closeActiveModal}
        card={selectedCard}
      />
    </div>
  );
}

export default App;
