import SideBar from "./SideBar";
import ClothesSection from "./ClothesSection";

function Profile({ handleAddClick, handleCardClick, clothingItems }) {
  return (
    <div className="profile">
      <SideBar />
      <ClothesSection
        handleAddClick={handleAddClick}
        handleCardClick={handleCardClick}
        clothingItems={clothingItems}
      />
    </div>
  );
}

export default Profile;
