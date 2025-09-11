import "./Schedule.scss";
import { useRef } from "react";
import { useOverlay } from "../../contexts/overlayContext";
import { useClickOutside } from "../../hooks/useClickOutside";
import { Searchbar } from "../Searchbar/Searchbar";
import { SearchResults } from "../SearchResults/SearchResults";
import { Navbar } from "../Navbar/Navbar";
import { Matches } from "../Matches/Matches";

export const Schedule = () => {
  const { setFocused } = useOverlay();
  const inputRef = useRef<HTMLInputElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  useClickOutside([inputRef, resultsRef], () => setFocused(false));

  return (
    <div className="schedule__container">
      <Searchbar ref={inputRef} />
      <SearchResults ref={resultsRef} />
      <Navbar />
      <Matches />
    </div>
  );
};
