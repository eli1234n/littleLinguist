import { TranslatedWord } from "./translated-word";

export class GamePoint {
    constructor(
        public id:number,
        public name:string,
        public currentPoint:number,
        public currentCards:TranslatedWord[],
        public attemptsCount:number,
        public successesCount:number,



    ) {}
  }