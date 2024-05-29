import { Injectable } from '@angular/core';
import { GamePlayed } from '../../shared/model/game-played';

@Injectable({
  providedIn: 'root',
})
export class PointsService {
  private gamePoints: GamePlayed[] = [];

  constructor() {
    localStorage.setItem(
      'gamePoints',
      JSON.stringify(Array.from(this.gamePoints))
    );
  }

  getGamePoints(): GamePlayed[] {
    return this.gamePoints;
  }

  addGamePlayed(gamePlayed: GamePlayed) {
    this.gamePoints.push(gamePlayed);
    localStorage.setItem(
      'gamePoints',
      JSON.stringify(Array.from(this.gamePoints))
    );
  }
}
