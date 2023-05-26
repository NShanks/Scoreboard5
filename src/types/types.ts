export type TeamData = {
  placement: number;
  [playerName: string]: number | string;
  score: number;
};

export type GameData = {
  [teamName: string]: TeamData;
};

export type Game = GameData & {
  match_string: string;
};
