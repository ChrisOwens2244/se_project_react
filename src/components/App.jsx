import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import Header from "./Header.jsx";
import Footer from "./Footer.jsx";
import Main from "./Main.jsx";
import AddItemModal from "./AddItemModal.jsx";
import ItemModal from "./ItemModal.jsx";
import Profile from "./Profile.jsx";
import { getWeather, filterWeatherData } from "../utils/weatherApi.js";
import { coordinates, APIkey } from "../utils/constants.js";
import {
  getClothes,
  addClothingItems,
  deleteClothingItems,
} from "../utils/api.js";

import { CurrentTemperatureUnitContext } from "../contexts/CurrentTemperatureUnitContext.js";

function App() {
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 999, C: 999 },
    city: "",
  });
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [clothingItems, setClothingItems] = useState([]);

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

  const onAddItem = (values) => {
    addClothingItems(values)
      .then((data) => {
        setClothingItems([data, ...clothingItems]);
        closeActiveModal();
      })
      .catch(console.error);
  };

  const handleToggleSwitchChange = () => {
    currentTemperatureUnit === "F"
      ? setCurrentTemperatureUnit("C")
      : setCurrentTemperatureUnit("F");
  };

  const handleDelete = (card) => {
    deleteClothingItems(card)
      .then((data) => {
        setClothingItems(
          clothingItems.filter((item) => {
            return item._id != card._id;
          })
        );
        closeActiveModal();
      })
      .catch(console.error);
  };

  useEffect(() => {
    getClothes()
      .then((data) => {
        setClothingItems(data);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    getWeather(coordinates, APIkey)
      .then((data) => {
        const filteredData = filterWeatherData(data);
        setWeatherData(filteredData);
      })
      .catch(console.error);
  }, []);

  return (
    <CurrentTemperatureUnitContext.Provider
      value={{ currentTemperatureUnit, handleToggleSwitchChange }}
    >
      <div className="page">
        <div className="page__content">
          <Header handleAddClick={handleAddClick} weatherData={weatherData} />
          <Routes>
            <Route
              path="/"
              element={
                <Main
                  weatherData={weatherData}
                  handleCardClick={handleItemClick}
                  clothingItems={clothingItems}
                />
              }
            />
            <Route
              path="/profile"
              element={
                <Profile
                  handleAddClick={handleAddClick}
                  handleCardClick={handleItemClick}
                  clothingItems={clothingItems}
                />
              }
            />
          </Routes>
          <Footer />
        </div>
        {activeModal === "add-garment" && (
          <AddItemModal
            isOpen={activeModal === "add-garment"}
            onAddItem={onAddItem}
            onCloseModal={closeActiveModal}
          />
        )}
        {activeModal === "preview" && (
          <ItemModal
            activeModal={activeModal}
            onClose={closeActiveModal}
            card={selectedCard}
            onDelete={handleDelete}
          />
        )}
      </div>
    </CurrentTemperatureUnitContext.Provider>
  );
}

export default App;
