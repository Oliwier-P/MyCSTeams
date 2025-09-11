import "./Overlay.css";
import { useOverlay } from "../../contexts/overlayContext";

export const Overlay = () => {
  const { focused } = useOverlay();

  return <div className={`overlay ${focused ? "active" : ""}`}></div>;
};
