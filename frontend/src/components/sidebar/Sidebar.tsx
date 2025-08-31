import "./Sidebar.css";

type SidebarProps = {
  isActive: boolean;
};

export const Sidebar = ({ isActive }: SidebarProps) => {
  return (
    <div className={`sidebar ${isActive ? "show" : ""}`}>
      <div className="title">Title</div>
      <div className="teams__container">
        <div>T1</div>
        <div>T2</div>
      </div>
    </div>
  );
};
