import "./SearchResults.scss";
import { forwardRef } from "react";
import { useOverlay } from "../../contexts/overlayContext";
import { TeamResult } from "./TeamResult";
import { useSearchTeams } from "../../hooks/useSearchTeams";

type SearchResultsProps = React.HTMLAttributes<HTMLDivElement> & {
  searchText: string;
};

export const SearchResults = forwardRef<HTMLDivElement, SearchResultsProps>(({ searchText, ...props }, ref) => {
  const { focused } = useOverlay();
  const teamsResult = useSearchTeams(searchText);

  return (
    <div {...props} ref={ref} className={`search__results ${focused ? "" : "hide"}`}>
      {teamsResult.map((team, index) => (
        <div key={index}>
          <TeamResult rank={team.rank} logo={team.logo} name={team.name} slug={team.slug} />
          <span className="team_underline"></span>
        </div>
      ))}
    </div>
  );
});
