export type TeamData = {
    [key: string]: {
      placement: number,
      [key: string]: number
    }
  }

export type Game = {
    [key: string] : TeamData
  }