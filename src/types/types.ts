export type TeamData = {
    [key: string]: {
      placement: number,
      [key: string]: number
    }
  }

export type Game = {
    match_string: string;
    game: {
      [key: string]: TeamData;
    };
  }
  