import "./Schedule.css";
import { NavigateBar } from "../navigate/NavigateBar";
import { Searchbar } from "../searchbar/Searchbar";
import { Matches } from "../matches/Matches";

export const Schedule = () => {
  return (
    <div className="schedule__container">
      <Searchbar />
      <NavigateBar />
      <Matches />
    </div>
  );
};
