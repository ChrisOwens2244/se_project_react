import React, { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function SideBar({ onEditClick, handleLogOut }) {
  const user = useContext(CurrentUserContext);
  const currentUser = user?.currentUser.data;

  return (
    <div className="sidebar">
      <div className="sidebar__profile">
        {currentUser?.avatar === "" ? (
          <p className="sidebar__avatar">{currentUser.name.charAt(0)}</p>
        ) : (
          <img
            src={currentUser?.avatar}
            className="sidebar__avatar"
            alt={currentUser?.name}
          />
        )}
        <p className="sidebar__username">{currentUser?.name}</p>
      </div>
      <div className="sidebar__btns">
        <button
          className="sidebar__edit-btn"
          type="button"
          onClick={onEditClick}
        >
          Edit Profile
        </button>
        <button onClick={handleLogOut} className="sidebar__sign-out-btn">
          Sign Out
        </button>
      </div>
    </div>
  );
}

export default SideBar;
