import { useEffect, useState } from "react";
import { isValidText } from "../utlis";
import type { TeamsResultType } from "../types/TeamsResultType";

export const useSearchTeams = (searchText: string) => {
  const [teamsResult, setTeamsResult] = useState<TeamsResultType[]>([]);

  useEffect(() => {
    if (!isValidText(searchText)) {
      setTeamsResult([]);
      return;
    }

    const controller = new AbortController();
    const signal = controller.signal;

    fetch(`http://127.0.0.1:8000/api/search-teams/${searchText}`, { signal })
      .then((res) => res.json())
      .then((data) => {
        const results: TeamsResultType[] = data.teams.results.map((team: any) => ({
          rank: team.rank,
          logo: team.image_url,
          name: team.name,
        }));
        setTeamsResult(results);
      })
      .catch((err) => {
        if (err.name === "AbortError") return; // request canceled
        console.error(err);
      });

    return () => controller.abort(); // cancels previous request
  }, [searchText]);

  return teamsResult;
};
