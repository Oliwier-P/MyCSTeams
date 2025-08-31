import "./Schedule.css";
import { NavigateBar } from "../navigate/NavigateBar";
import { Searchbar } from "../searchbar/Searchbar";
import { SidebarButton } from "../sidebarbutton/SidebarButton";

export const Schedule = () => {
  return (
    <div className="schedule__container">
      <SidebarButton />
      <Searchbar />
      <NavigateBar />
    </div>
  );
};
