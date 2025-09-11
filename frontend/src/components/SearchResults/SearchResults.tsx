import "./SearchResults.scss";
import { forwardRef } from "react";
import { useOverlay } from "../../contexts/overlayContext";

export const SearchResults = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>((props, ref) => {
  const { focused } = useOverlay();

  return (
    <div {...props} ref={ref} className={`search__results ${focused ? "" : "hide"}`}>
      <button>Click</button>
    </div>
  );
});
