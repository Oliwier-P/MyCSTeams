import "./Homepage.scss";
import { Overlay } from "./../../components/Overlay/Overlay";
import { Sidebar } from "./../../components/Sidebar/Sidebar";
import { Schedule } from "./../../components/Schedule/Schedule";

export const HomePage = () => {
  return (
    <div className="home__container">
      <Overlay />
      <Sidebar />
      <Schedule />
    </div>
  );
};
