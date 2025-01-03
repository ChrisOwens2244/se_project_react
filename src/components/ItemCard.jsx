import React, { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function ItemCard({ item, onCardClick, onCardLike, isLoggedIn }) {
  const handleCardClick = () => {
    onCardClick(item);
  };

  const user = useContext(CurrentUserContext);
  const currentUser = user.currentUser.data;

  // Check if the item was liked by the current user
  // The likes array should be an array of ids
  const isLiked = item.likes?.some((id) => id === currentUser._id);

  // Create a variable which you then set in `className` for the like button
  const likeClassName = `card__like-btn ${
    isLoggedIn ? "" : "card__like-btn_hidden"
  } ${isLiked ? "card__like-btn_liked" : "card__like-btn_disliked"}`;

  const handleLike = () => {
    onCardLike({ id: item._id, isLiked: isLiked });
  };

  return (
    <li className="card">
      <div className="card__name-container">
        <h2 className="card__name">{item.name}</h2>
        <button className={likeClassName} type="button" onClick={handleLike} />
      </div>
      <img
        onClick={handleCardClick}
        className="card__image"
        src={item.imageUrl}
        alt={item.name}
      />
    </li>
  );
}

export default ItemCard;
