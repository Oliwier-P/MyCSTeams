import "./App.css";
import { Overlay } from "./components/overlay/Overlay";
import { Sidebar } from "./components/sidebar/Sidebar";
import { Schedule } from "./components/schedule/Schedule";

export const App = () => {
  return (
    <div className="main__container">
      <Overlay />
      <Sidebar />
      <Schedule />
    </div>
  );
};
