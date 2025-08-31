import "./App.css";
import { useEffect, useState } from "react";
import { Schedule } from "./components/schedule/Schedule";
import { Sidebar } from "./components/sidebar/Sidebar";
import { SidebarButton } from "./components/sidebarbutton/SidebarButton";
import { useWindowWidth } from "./hooks/useWindowWidth";

export const App = () => {
  const [isSidebarActive, setIsSidebarActive] = useState<boolean>(false);
  const width = useWindowWidth();

  const handleShowSidebar = () => {
    setIsSidebarActive(!isSidebarActive);
  };

  useEffect(() => {
    if (width >= 750 && isSidebarActive) {
      setIsSidebarActive(false);
    }
  }, [width]);

  return (
    <div className="main__container">
      <SidebarButton onClick={handleShowSidebar} />
      <Sidebar isActive={isSidebarActive} />
      <Schedule />
    </div>
  );
};
