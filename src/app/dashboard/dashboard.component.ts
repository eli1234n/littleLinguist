import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { Router, NavigationEnd, RouterLink } from '@angular/router';
import { PointsService } from '../services/points-service';
import { GamePlayed } from '../../shared/model/game-played';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent implements OnInit, OnDestroy {
  gameCount = 43;
  points = 110;
  averageTime = 1.1;
  hoursPlay = 37;
  timeGame = 86;
  categoryPlay = 'School';
  typeGame = 'Matching Game';

  private routerSubscription: Subscription;

  constructor(private pointsService: PointsService, private router: Router) {
    this.routerSubscription = this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.updateVariables();
      });
  }

  ngOnInit(): void {
    this.updateVariables();
  }

  ngOnDestroy(): void {
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
  }

  updateVariables(): void {
    this.resetValues();

    this.pointsService.getGamePoints().then((result: GamePlayed[]) => {
      this.gameCount += result.length;
      this.points += result.reduce((acc, game) => acc + game.points, 0);
    });

    this.gameCount += 5;
    this.points += 5;
    this.averageTime += 0.2;
    this.hoursPlay += 1;
    this.timeGame += 1;
  }

  resetValues(): void {
    this.gameCount = 43;
    this.points = 110;
    this.averageTime = 1.1;
    this.hoursPlay = 37;
    this.timeGame = 86;
  }

  navigateAndUpdate(): void {
    this.updateVariables();
    this.router.navigate(['/choose']);
  }
}
