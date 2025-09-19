import "./Sidebar.scss";
import { useEffect, useState } from "react";
import { useOverlay } from "../../contexts/overlayContext";
import { useUserAuth } from "../../hooks/useUserAuth";
import { useWindowWidth } from "../../hooks/useWindowWidth";
import { Team } from "./Team";
import { titleColor } from "../../utlis";

export const Sidebar = () => {
  const [showSidebar, setShowSidebar] = useState<boolean>(false);
  const [followingTeams, setFollowingTeams] = useState<any[]>([]);
  const { focused } = useOverlay();
  const { user, logout } = useUserAuth();
  const width = useWindowWidth();

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
      <div className={`user__container ${showSidebar ? "" : "hide"}`}>
        <div className={`user ${showSidebar ? "" : "hide"}`}>{user?.username}</div>
        <div className={`logout ${showSidebar ? "" : "hide"}`} onClick={logout}>
          <img src="/logout.svg" alt="Logout" title="Logout" />
        </div>
      </div>
    </div>
  );
};
