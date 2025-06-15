export const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

export const formatPopularity = (popularity: number) => {
  return Math.round(popularity).toLocaleString();
};

export const getScoreColor = (score: number) => {
  if (score >= 7) return "#21d07a";
  if (score >= 5) return "#d2d531";
  return "#db2360";
};
