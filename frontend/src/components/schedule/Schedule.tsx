import "./Schedule.css";
import { NavigateBar } from "../navigate/NavigateBar";
import { Searchbar } from "../searchbar/Searchbar";

export const Schedule = () => {
  return (
    <div className="schedule__container">
      <Searchbar />
      <NavigateBar />
    </div>
  );
};
