import { NavigateBar } from "../navigate/NavigateBar";
import { Searchbar } from "../searchbar/Searchbar";
import "./Schedule.css";

export const Schedule = () => {
  return (
    <div className="schedule__container">
      <Searchbar />
      <NavigateBar />
    </div>
  );
};
