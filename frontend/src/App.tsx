import "./App.css";
import { Overlay } from "./components/Overlay/Overlay";
import { Sidebar } from "./components/Sidebar/Sidebar";
import { Schedule } from "./components/Schedule/Schedule";

export const App = () => {
  return (
    <div className="main__container">
      <Overlay />
      <Sidebar />
      <Schedule />
    </div>
  );
};
