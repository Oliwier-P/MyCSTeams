import "./Match.scss";

type MatchProps = {
  isLive: boolean;
  teamLogo1: any;
  teamName1: string;
  teamScore1?: number;
  teamMapScore1?: number;
  teamLogo2: any;
  teamName2: string;
  teamScore2?: number;
  teamMapScore2?: number;
  tournamentName: string;
  startAtTime: string;
};

export const Match = ({
  isLive,
  teamLogo1,
  teamName1,
  teamScore1,
  teamMapScore1,
  teamLogo2,
  teamName2,
  teamScore2,
  teamMapScore2,
  tournamentName,
  startAtTime,
}: MatchProps) => {
  const isLiveType = isLive ? "live" : "not__live";
  const teamScoreType1 = teamScore1 === teamScore2 ? "draw" : teamScore1! > teamScore2! ? "win" : "lose";
  const teamScoreType2 = teamScore1 === teamScore2 ? "draw" : teamScore1! < teamScore2! ? "win" : "lose";
  const teamMapScoreType1 = teamMapScore1 === teamMapScore2 ? "draw" : teamMapScore1! > teamMapScore2! ? "win" : "lose";
  const teamMapScoreType2 = teamMapScore1 === teamMapScore2 ? "draw" : teamMapScore1! < teamMapScore2! ? "win" : "lose";

  return (
    <div className="match__info">
      <div className="team__container">
        <div className={`team__logo ${isLiveType}`}>{teamLogo1}</div>
        <div className={`team__name ${isLiveType}`}>{teamName1}</div>
        {isLive && <div className={`team__score ${teamScoreType1}`}>{teamScore1}</div>}
      </div>
      <div className="match__status">
        <div className="tournament__name">{tournamentName}</div>
        {!isLive && <div className="tournament__vs">VS</div>}
        {!isLive && <div className="tournament__time">{startAtTime}</div>}
        {isLive && (
          <div className="tournament__map__score">
            <div className={`score ${teamMapScoreType1}`}>{teamMapScore1}</div>
            <span className="dots">:</span>
            <div className={`score ${teamMapScoreType2}`}>{teamMapScore2}</div>
          </div>
        )}
      </div>
      <div className="team__container">
        <div className={`team__logo ${isLiveType}`}>{teamLogo2}</div>
        <div className={`team__name ${isLiveType}`}>{teamName2}</div>
        {isLive && <div className={`team__score ${teamScoreType2}`}>{teamScore2}</div>}
      </div>
    </div>
  );
};
