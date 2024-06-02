import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { GamePoint } from '../../shared/model/game-points';
import { RouterModule } from '@angular/router';
import { GameResult } from '../../shared/model/game-result';

enum grade {
  Fail = 'Fail',
  Pass = 'Pass',
  Good = 'Good',
  Excellent = 'Excellent',
}

@Component({
  selector: 'app-result',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './result.component.html',
  styleUrl: './result.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResultComponent {
  gameDetails: GamePoint = new GamePoint('0', '', 0, [], 0, 0);
  gradeStatus: grade = grade.Fail;

  dashboardResultSave() {
    const dashboardDetails = JSON.parse(
      localStorage.getItem('dashboardResult') || ''
    ) as GameResult;
    dashboardDetails.gamesCounter += 1;
    dashboardDetails.pointCounter += this.gameDetails.successesCount;
    localStorage.setItem('dashboardResult', JSON.stringify(dashboardDetails));
  }

  ngOnInit(): void {
    this.gameDetails = JSON.parse(
      localStorage.getItem('gameResult') || ''
    ) as GamePoint;
    this.dashboardResultSave();
    if (this.gameDetails.currentPoint > 80) {
      this.gradeStatus = grade.Excellent;
    } else if (this.gameDetails.currentPoint > 60) {
      this.gradeStatus = grade.Good;
    } else if (this.gameDetails.currentPoint > 50) {
      this.gradeStatus = grade.Pass;
    } else {
      this.gradeStatus = grade.Fail;
    }
  }

  successRate() {
    if (this.gameDetails.attemptsCount == 0) {
      return 0;
    } else {
      return (
        (
          (this.gameDetails.successesCount / this.gameDetails.attemptsCount) *
          100
        ).toFixed(0) || 0 
      );
    }
  }
}
