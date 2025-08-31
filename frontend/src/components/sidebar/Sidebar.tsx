import "./Sidebar.css";

type SidebarProps = {
  isActive: boolean;
};

export const Sidebar = ({ isActive }: SidebarProps) => {
  return (
    <div className={`sidebar ${isActive ? "show" : ""}`}>
      <div className={`title ${isActive ? "smaller__title" : ""}`}>
        My<span style={{ color: "#2200E4" }}>CS</span>Teams
      </div>
      <div className="teams__container">
        <div className={`following__team`}>Astralis</div>
        <div className={`following__team`}>Vitality</div>
        <div className={`following__team`}>Faze</div>
      </div>
    </div>
  );
};
