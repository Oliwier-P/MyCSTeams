import "./Team.scss";

type TeamProps = {
  onlyLogo: boolean;
  id: number;
  logo: string;
  name: string;
};

export const Team = ({ onlyLogo, id, logo, name }: TeamProps) => {
  const handleUnfollow = () => {
    // TODO: Remove team
  };

  return (
    <div className={`following__team ${onlyLogo ? "" : "only-logo"}`} style={{ ["--team-logo" as string]: `url(${logo})` }}>
      <div className="following__team__name">{name}</div>
      <div className="following__team__unfollow" onClick={handleUnfollow}></div>
    </div>
  );
};
