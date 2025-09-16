export const titleColor = "#FFA500";

export const isValidText = (value: string) => {
  if (!value) return false; // empty string, null, undefined
  if (!isNaN(Number(value))) return false; // number
  if (value.trim() === "") return false; // spaces
  return true;
};
