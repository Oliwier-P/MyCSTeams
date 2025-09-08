import "./Date.scss";

type DateProps = {
  date?: string;
};

export const Date = ({ date }: DateProps) => {
  const isLive = !date ? "live" : "";
  const text = date ? date : "Live";

  return <div className={`match__date ${isLive}`}>{text}</div>;
};
