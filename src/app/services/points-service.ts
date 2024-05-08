import { Injectable } from '@angular/core';
import { GamePlayed } from '../../shared/model/game-played';
import { GamePoint } from '../../shared/model/game-points';


@Injectable({
  providedIn: 'root'
})
export class PointsService {
  private gamePoints: GamePlayed[] = []; 

  constructor() {
      localStorage.setItem("gamePoints",JSON.stringify(Array.from(this.gamePoints)))
      
   }


  getGamePoints(): GamePlayed[] {
    return this.gamePoints;
  }


  addGamePlayed(gamePlayed: GamePlayed) {
    this.gamePoints.push(gamePlayed);
    localStorage.setItem("gamePoints",JSON.stringify(Array.from(this.gamePoints)))
  }

  updateGamePlayed(game: GamePoint){
    for(let i = 0 ; i < this.gamePoints.length;i++){
      if(this.gamePoints[i].gameId === game.id){
        this.gamePoints[i].points = game.currentPoint
        localStorage.setItem("gamePoints",JSON.stringify(Array.from(this.gamePoints)))
        return
      }
    }

  }


}

