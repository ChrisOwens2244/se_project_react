import ItemCard from "./ItemCard.jsx";

function ClothesSection({ handleAddClick, handleCardClick, clothingItems }) {
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
        {clothingItems.map((item) => {
          return (
            <ItemCard
              key={item._id}
              item={item}
              onCardClick={handleCardClick}
            />
          );
        })}
      </ul>
    </div>
  );
}

export default ClothesSection;
