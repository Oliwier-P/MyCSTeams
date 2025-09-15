import "./TeamResult.scss";

type TeamResultProps = {
  rank: number;
  logo: string;
  name: string;
  slug: string;
};

export const TeamResult = ({ rank, logo, name, slug }: TeamResultProps) => {
  const handleFollowTeam = () => {
    //TODO: Add team
  };

  return (
    <div className={`team__result`}>
      <div className={`team__result__rank`}>#{rank}</div>
      <div className={`team__result__logo`}>
        <img src={logo} alt="logo" />
      </div>
      <div className={`team__result__name`}>{name}</div>
      <div className={`team__result__follow`}>
        <button onClick={handleFollowTeam}>+</button>
      </div>
    </div>
  );
};
