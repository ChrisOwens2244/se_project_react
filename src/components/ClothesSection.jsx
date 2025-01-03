import { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";
import ItemCard from "./ItemCard.jsx";

function ClothesSection({
  handleAddClick,
  handleCardClick,
  clothingItems,
  onCardLike,
  isLoggedIn,
}) {
  const user = useContext(CurrentUserContext);
  const currentUser = user.currentUser.data;

  return (
    <div className="clothes-section">
      <div className="clothes-section__top">
        <p className="clothes-section__label">Your Items</p>
        <button
          className="clothes-section__add-clothes-btn"
          type="button"
          onClick={handleAddClick}
        >
          + Add Clothes
        </button>
      </div>
      <ul className="clothes-section__list">
        {clothingItems?.map((item) => {
          // Checking if the current user is the owner of the current clothing item
          const isOwn = item.owner === currentUser?._id;

          // Creating a variable which you'll then set in `className` for the item card
          const itemClassName = `clothes-section__item-card ${
            isOwn ? "" : "clothes-section__item-card_hidden"
          }`;
          return (
            <ItemCard
              className={itemClassName}
              key={item._id}
              item={item}
              onCardClick={handleCardClick}
              onCardLike={onCardLike}
              isLoggedIn={isLoggedIn}
            />
          );
        })}
      </ul>
    </div>
  );
}

export default ClothesSection;
