export class GamePlayed {
    constructor(
      public categoryId: number,
      public gameId: number,
      public date: Date,
      public points: number
    ) {}
  }