import "./Searchbar.css";
import { useOverlay } from "../../contexts/overlayContext";

export const Searchbar = () => {
  const { focused, toggleFocused } = useOverlay();

  return <input className={`searchbar ${focused ? "focused" : ""}`} placeholder="Find your team..." onFocus={toggleFocused} onBlur={toggleFocused} />;
};
