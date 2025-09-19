import "./Homepage.scss";
import { Overlay } from "./../../components/Overlay/Overlay";
import { Sidebar } from "./../../components/Sidebar/Sidebar";
import { Schedule } from "./../../components/Schedule/Schedule";
import { useUserAuth } from "../../hooks/useUserAuth";

export const HomePage = () => {
  const { user } = useUserAuth();

  return (
    <div className="home__container">
      {user ? (
        <>
          <Overlay />
          <Sidebar />
          <Schedule />
        </>
      ) : (
        <div className="loader" title="Loading...">
          <div className="loader__rectangle"></div>
        </div>
      )}
    </div>
  );
};
