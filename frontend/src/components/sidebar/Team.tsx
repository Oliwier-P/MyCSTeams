import "./Team.scss";

type TeamProps = {
  onlyLogo: boolean;
  logo: string;
  name: string;
};

export const Team = ({ onlyLogo, logo, name }: TeamProps) => {
  const handleUnfollow = () => {
    console.log("Unfollow");
  };

  return (
    <div
      className={`following__team ${onlyLogo ? "" : "only-logo"}`}
      style={{
        background: `#1f1f1f url(${logo}) no-repeat center`,
        backgroundSize: "55%",
      }}
    >
      <div className="following__team__name">{name}</div>
      <div className="following__team__unfollow" onClick={handleUnfollow}></div>
    </div>
  );
};
