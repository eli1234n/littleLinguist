import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { GameResult } from '../../shared/model/game-result';
import { RouterLink } from '@angular/router';


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

  dashboardDetails:GameResult = new GameResult()
  ngOnInit(): void {
    try{
    this.dashboardDetails= JSON.parse(localStorage.getItem("dashboardResult")||'') as GameResult;
    }
    catch{
      localStorage.setItem("dashboardResult",JSON.stringify(this.dashboardDetails))
    }    
  }
  longTime(){
   
  }
}
