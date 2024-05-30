import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { GameResult } from '../../shared/model/game-result';
import { RouterLink } from '@angular/router';
import { PointsService } from '../services/points-service';
import { GamePlayed } from '../../shared/model/game-played';


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,RouterLink
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})


  export class DashboardComponent { 
    gameCount = 0
    points = 0
    averageTime = 0
    
    constructor(private pointsService : PointsService ){
    
    }
     
      ngOnInit(): void {
     this.pointsService.getGamePoints().then((result : GamePlayed[])=>{
    this.gameCount = result.length;
    
    
     }); 
      }
     
    }
    

