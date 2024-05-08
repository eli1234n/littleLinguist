import { Injectable } from '@angular/core';
import { GameProfile } from '../../../shared/model/game-profile';
import { GameDifficulty } from '../../../shared/model/game-difficulty';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  private games: GameProfile[] = [
    new GameProfile (2,  'Matching Game', 'A matching pairs game', GameDifficulty.EASY, "matching"),
    new GameProfile ( 3, 'Mixed words Game','A game to test category knowledge',GameDifficulty.HARD, "mixed") 

  ];

  constructor() { }


  getGames(): GameProfile[] {
    return this.games;
  }
}
