import "./App.css";
import { Overlay } from "./components/Overlay/Overlay";
import { Sidebar } from "./components/Sidebar/Sidebar";
import { Schedule } from "./components/Schedule/Schedule";

import { useEffect } from "react";

export const App = () => {
  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/live-matches")
      .then((res) => res.json())
      .then((data) => console.log(data));
  }, []);

  return (
    <div className="main__container">
      <Overlay />
      <Sidebar />
      <Schedule />
    </div>
  );
};
