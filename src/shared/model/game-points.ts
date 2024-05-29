import { TranslatedWord } from './translated-word';

export class GamePoint {
  constructor(
    public categoryId: string, 
    public name: string,
    public currentPoint: number,
    public currentCards: TranslatedWord[],
    public attemptsCount: number,
    public successesCount: number
  ) {}
}
