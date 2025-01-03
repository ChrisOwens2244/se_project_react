import SideBar from "./SideBar";
import ClothesSection from "./ClothesSection";

function Profile({
  handleAddClick,
  handleCardClick,
  clothingItems,
  handleEditClick,
  handleLogOut,
  onCardLike,
  isLoggedIn,
}) {
  return (
    <div className="profile">
      <SideBar onEditClick={handleEditClick} handleLogOut={handleLogOut} />
      <ClothesSection
        handleAddClick={handleAddClick}
        handleCardClick={handleCardClick}
        clothingItems={clothingItems}
        onCardLike={onCardLike}
        isLoggedIn={isLoggedIn}
      />
    </div>
  );
}

export default Profile;
