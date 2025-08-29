import "./App.css";
import { Schedule } from "./components/schedule/Schedule";
import { Sidebar } from "./components/sidebar/Sidebar";

export const App = () => {
  return (
    <div className="main__container">
      <Sidebar />
      <Schedule />
    </div>
  );
};
