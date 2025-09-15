import "./Sidebar.scss";
import { useEffect, useState } from "react";
import { useOverlay } from "../../contexts/overlayContext";
import { useWindowWidth } from "../../hooks/useWindowWidth";
import { Team } from "./Team";

export const Sidebar = () => {
  const titleColor = "#2200E4";
  const [showSidebar, setShowSidebar] = useState<boolean>(false);
  const width = useWindowWidth();
  const { focused } = useOverlay();
  const [followingTeams, setFollowingTeams] = useState<[]>([]);
  // TODO: Fetch teams

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
        My<span style={{ color: titleColor }}>CS</span>Teams
      </div>
      <div className="teams__container">
        {followingTeams.map((team: any, index) => (
          <Team key={index} onlyLogo={showSidebar} id={team.team_data.id} logo={team.team_data.image_url} name={team.team_data.name} />
        ))}
      </div>
    </div>
  );
};
