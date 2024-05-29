export class GamePlayed {
    constructor(
      public categoryId: string,
      public gameId: number,
      public date: Date,
      public points: number,
      public secondsLeftInGame:number,
      public secondsPlayed :number
    ) {}
  }