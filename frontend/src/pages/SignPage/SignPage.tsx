import "./SignPage.scss";
import { Sign } from "../../components/Sign/Sign";
import { titleColor } from "../../utlis";
import { useUserAuth } from "../../hooks/useUserAuth";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const SignPage = () => {
  const { user } = useUserAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user]);

  return (
    <div className={`sign__container`}>
      <div className={`title`}>
        My<span style={{ color: titleColor }}>CS</span>Teams
      </div>
      <Sign />
    </div>
  );
};
