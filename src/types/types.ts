export type TeamData = {
  placement: number;
  [playerName: string]: number | string;
  score: number;
};

export type Game = {
  match_string: string;
  [teamName: string]: TeamData | string;
};