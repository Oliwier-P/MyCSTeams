import "./Homepage.scss";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Overlay } from "./../../components/Overlay/Overlay";
import { Sidebar } from "./../../components/Sidebar/Sidebar";
import { Schedule } from "./../../components/Schedule/Schedule";
import type { UserType } from "../../types/UserType";

export const HomePage = () => {
  const [user, setUser] = useState<UserType | null>(null);
  const navigate = useNavigate();

  const fetchUser = async () => {
    try {
      const response = await fetch("http://localhost:8000/me", {
        method: "GET",
        credentials: "include", // Include cookies in the request
      });

      if (response.status === 401) {
        const refreshResponse = await fetch("http://localhost:8000/refresh", {
          method: "POST",
          credentials: "include", // Include cookies in the request
        });

        if (!refreshResponse.ok) {
          return fetchUser();
        } else {
          navigate("/sign");
          return;
        }
      }

      if (!response.ok) {
        navigate("/sign");
        return;
      }

      const data = await response.json();
      setUser(data);
    } catch (err) {
      console.error(err);
      navigate("/sign");
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

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
