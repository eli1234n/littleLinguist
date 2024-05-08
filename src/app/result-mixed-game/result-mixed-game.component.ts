import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { GamePoint } from '../../shared/model/game-points';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { GameResult } from '../../shared/model/game-result';

@Component({
  selector: 'app-result-mixed-game',
  standalone: true,
  imports: [
    CommonModule,RouterModule,MatIconModule
  ],
  templateUrl: './result-mixed-game.component.html',
  styleUrl: './result-mixed-game.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResultMixedGameComponent {


  gameDetails:GamePoint=new GamePoint(0,'',0,[],0,0)

  dashboardResultSave(){
    const dashboardDetails = JSON.parse(localStorage.getItem("dashboardResult")||'') as GameResult;
    dashboardDetails.gamesCounter+=1;
    dashboardDetails.pointCounter+=this.gameDetails.successesCount;
    localStorage.setItem("dashboardResult",JSON.stringify(dashboardDetails))
  }
  ngOnInit(): void {
    this.gameDetails = JSON.parse(localStorage.getItem('gameResult')||'') as GamePoint 
    this.dashboardResultSave()
  }


 }
