import "./Sidebar.css";
import { useEffect, useState } from "react";
import { useOverlay } from "../../contexts/overlayContext";
import { useWindowWidth } from "../../hooks/useWindowWidth";

export const Sidebar = () => {
  const [showSidebar, setShowSidebar] = useState<boolean>(false);
  const width = useWindowWidth();
  const { focused } = useOverlay();

  const handleToggleSidebar = () => {
    setShowSidebar((prev) => !prev);
  };

  useEffect(() => {
    if (focused || width < 850) {
      setShowSidebar(false);
    }
  }, [focused, width]);

  return (
    <div className={`sidebar ${showSidebar ? "show" : ""}`}>
      <div className="sidebar__button" onClick={handleToggleSidebar}>
        <div className="sidebar__button__line"></div>
        <div className="sidebar__button__line"></div>
        <div className="sidebar__button__line"></div>
      </div>
      <div className={`title ${showSidebar ? "" : "hide"}`}>
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
