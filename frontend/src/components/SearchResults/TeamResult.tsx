import "./TeamResult.scss";

type TeamResultProps = {
  rank: number;
  logo: string;
  name: string;
};

export const TeamResult = ({ rank, logo, name }: TeamResultProps) => {
  return (
    <div className={`team__result`}>
      <div className={`team__result__rank`}>#{rank}</div>
      <div className={`team__result__logo`}>
        <img src={logo} alt="logo" />
      </div>
      <div className={`team__result__name`}>{name}</div>
      <div className={`team__result__follow`}>
        <button>+</button>
      </div>
    </div>
  );
};
