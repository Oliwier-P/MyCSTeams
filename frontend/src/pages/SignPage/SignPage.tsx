import "./SignPage.scss";
import { Sign } from "../../components/Sign/Sign";
import { titleColor } from "../../utlis";

export const SignPage = () => {
  return (
    <div className={`sign__container`}>
      <div className={`title`}>
        My<span style={{ color: titleColor }}>CS</span>Teams
      </div>
      <Sign />
    </div>
  );
};
