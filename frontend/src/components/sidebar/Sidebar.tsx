import "./Sidebar.css";
import { useEffect, useState } from "react";
import { useOverlay } from "../../contexts/overlayContext";

type SidebarProps = {
  isActive: boolean;
};

export const Sidebar = ({ isActive }: SidebarProps) => {
  const [overlayActive, setOverlayActive] = useState<boolean>(isActive);
  const { focused } = useOverlay();

  useEffect(() => {
    focused ? setOverlayActive(false) : () => {};
  }, [focused]);

  useEffect(() => {
    setOverlayActive(isActive);
  }, [isActive]);

  return (
    <div className={`sidebar ${overlayActive ? "show" : ""}`}>
      <div className={`title ${overlayActive ? "smaller__title" : ""}`}>
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
