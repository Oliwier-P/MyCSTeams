import "./SidebarButton.css";

type SidebarButton = {
  onClick: () => void;
};

export const SidebarButton = ({ onClick }: SidebarButton) => {
  return <div className="sidebar__button" onClick={onClick}></div>;
};
