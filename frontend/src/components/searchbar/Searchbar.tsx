import "./Searchbar.scss";
import { forwardRef } from "react";
import { useOverlay } from "../../contexts/overlayContext";

export const Searchbar = forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>((props, ref) => {
  const { focused, setFocused } = useOverlay();

  return (
    <input
      {...props}
      ref={ref}
      id="searchbar"
      name="searchbar"
      className={`searchbar ${focused ? "focused" : ""}`}
      placeholder="Find your team..."
      onFocus={() => setFocused(true)}
      autoComplete="off"
    />
  );
});
