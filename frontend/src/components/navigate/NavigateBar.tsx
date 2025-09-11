import "./NavigateBar.css";

export const NavigateBar = () => {
  return (
    <div className="navigatebar">
      <div className="sub__container active">Watchlist</div>
      <div className="sub__container closed">Main events</div>
    </div>
  );
};
