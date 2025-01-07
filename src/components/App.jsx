import { useState, useEffect } from "react";
import {
  Routes,
  Route,
  Navigate,
  useNavigate,
  useLocation,
} from "react-router-dom";

import Header from "./Header.jsx";
import Footer from "./Footer.jsx";
import Main from "./Main.jsx";
import AddItemModal from "./AddItemModal.jsx";
import ItemModal from "./ItemModal.jsx";
import LoginModal from "./LoginModal.jsx";
import RegisterModal from "./RegisterModal.jsx";
import Profile from "./Profile.jsx";
import EditProfileModal from "./EditProfileModal.jsx";
import ProtectedRoute from "./ProtectedRoutes.jsx";
import { getWeather, filterWeatherData } from "../utils/weatherApi.js";
import { coordinates, APIkey } from "../utils/constants.js";
import {
  getClothes,
  addClothingItems,
  deleteClothingItems,
  editUser,
  addCardLike,
  removeCardLike,
} from "../utils/api.js";
import { getToken, setToken, removeToken } from "../utils/token.js";
import { register, login, getUserInfo } from "../utils/auth.js";

import { CurrentTemperatureUnitContext } from "../contexts/CurrentTemperatureUnitContext.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

function App() {
  //localStorage.clear();
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 999, C: 999 },
    city: "",
  });
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [clothingItems, setClothingItems] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setUserData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();
  const location = useLocation();

  const handleAddClick = () => {
    setActiveModal("add-garment");
  };

  const handleItemClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const handleEditClick = () => {
    setActiveModal("edit");
  };

  const closeActiveModal = () => {
    setActiveModal("");
  };

  const onAddItem = (values) => {
    const token = getToken();
    addClothingItems(values, token)
      .then((data) => {
        setClothingItems([data.item, ...clothingItems]);
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
    const token = getToken();
    deleteClothingItems(card, token)
      .then(() => {
        setClothingItems(
          clothingItems.filter((item) => {
            return item._id != card._id;
          })
        );
        closeActiveModal();
      })
      .catch(console.error);
  };

  const handleRegistration = (user) => {
    register(user)
      .then(() => {
        closeActiveModal();
        setActiveModal("login");
      })
      .catch(console.error);
  };

  const handleLogin = ({ email, password }) => {
    if (!email || !password) {
      return;
    }

    login(email, password)
      .then((data) => {
        // Save the token to local storage
        setToken(data.token);
        return getUserInfo(data.token);
      })
      .then((res) => {
        setUserData(res);
        setIsLoggedIn(true);
        setIsLoading(false);
        closeActiveModal();
      })
      .catch(console.error);
  };

  const handleLogOut = () => {
    removeToken();
    setUserData({});
    setIsLoggedIn(false);
    navigate("/");
  };

  const handleEdit = ({ name, avatar }) => {
    const jwt = getToken();
    editUser(name, avatar, jwt)
      .then((update) => {
        setUserData(update);
        closeActiveModal();
      })
      .catch(console.error);
  };

  const handleLoginClick = () => {
    setActiveModal("login");
  };

  const handleSignUpClick = () => {
    setActiveModal("signup");
  };

  const handleLogInToSignUp = () => {
    closeActiveModal();
    handleSignUpClick();
  };

  const handleSignUpToLogIn = () => {
    closeActiveModal();
    handleLoginClick();
  };

  const handleCardLike = ({ id, isLiked }) => {
    const token = getToken();
    // Check if this card is not currently liked
    !isLiked
      ? // if so, send a request to add the user's id to the card's likes array
        // the first argument is the card's id
        addCardLike(id, token)
          .then((updatedCard) => {
            setClothingItems((cards) =>
              cards.map((item) => (item._id === id ? updatedCard.item : item))
            );
          })
          .catch(console.error)
      : // if not, send a request to remove the user's id from the card's likes array
        // the first argument is the card's id
        removeCardLike(id, token)
          .then((updatedCard) => {
            setClothingItems((cards) =>
              cards.map((item) => (item._id === id ? updatedCard.item : item))
            );
          })
          .catch(console.error);
  };

  useEffect(() => {
    getClothes()
      .then((data) => {
        console.log(data);
        setClothingItems(data.data.reverse());
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

  useEffect(() => {
    console.log(isLoggedIn);
    const token = getToken();
    if (!token) {
      console.log("no token");
      setIsLoading(false);
      return;
    }
    console.log(token);
    if (token) {
      getUserInfo(token)
        .then((data) => {
          setIsLoggedIn(true);
          setUserData(data);
          setIsLoading(false);
        })
        .catch((error) => {
          setIsLoading(false);
          removeToken();
          console.error("Invalid Token", error);
        });
    }
  }, [isLoading]);

  return (
    <CurrentTemperatureUnitContext.Provider
      value={{ currentTemperatureUnit, handleToggleSwitchChange }}
    >
      <CurrentUserContext.Provider value={{ currentUser }}>
        <div className="page">
          <div className="page__content">
            <Header
              handleAddClick={handleAddClick}
              handleSignInClick={handleLoginClick}
              handleSignUpClick={handleSignUpClick}
              weatherData={weatherData}
              isLoggedIn={isLoggedIn}
            />
            <Routes>
              <Route
                path="/"
                element={
                  <Main
                    weatherData={weatherData}
                    handleCardClick={handleItemClick}
                    clothingItems={clothingItems}
                    onCardLike={handleCardLike}
                    isLoggedIn={isLoggedIn}
                  />
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute isLoggedIn={isLoggedIn}>
                    <Profile
                      handleAddClick={handleAddClick}
                      handleCardClick={handleItemClick}
                      clothingItems={clothingItems}
                      handleEditClick={handleEditClick}
                      handleLogOut={handleLogOut}
                      onCardLike={handleCardLike}
                      isLoggedIn={isLoggedIn}
                    />
                  </ProtectedRoute>
                }
              />
              {/* <Route
                path="*"
                element={
                  isLoggedIn ? (
                    <Navigate to="/profile" replace />
                  ) : (
                    <Navigate to="/" replace />
                  )
                }
              /> */}
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
          {activeModal === "login" && (
            <LoginModal
              isOpen={activeModal === "login"}
              onLogin={handleLogin}
              onCloseModal={closeActiveModal}
              handleSwitch={handleLogInToSignUp}
            />
          )}
          {activeModal === "signup" && (
            <RegisterModal
              isOpen={activeModal === "signup"}
              onRegister={handleRegistration}
              onCloseModal={closeActiveModal}
              handleSwitch={handleSignUpToLogIn}
            />
          )}
          {activeModal === "edit" && (
            <EditProfileModal
              isOpen={activeModal === "edit"}
              onEdit={handleEdit}
              onCloseModal={closeActiveModal}
            />
          )}
        </div>
      </CurrentUserContext.Provider>
    </CurrentTemperatureUnitContext.Provider>
  );
}

export default App;
