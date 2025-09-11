import "./Navbar.scss";

export const Navbar = () => {
  return (
    <div className="navbar">
      <div className="navbar__item active">Watchlist</div>
      <div className="navbar__item closed">Main events</div>
    </div>
  );
};
