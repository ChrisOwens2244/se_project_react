import avatar from "../assets/AvatarPlaceholder.svg";

function SideBar() {
  return (
    <div className="sidebar">
      <img src={avatar} className="sidebar__avatar" alt="Terry Tegegne" />
      <p className="sidebar__username">Terry Tegegne</p>
    </div>
  );
}

export default SideBar;
