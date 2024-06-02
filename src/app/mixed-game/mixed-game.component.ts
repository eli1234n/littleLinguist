import { Component } from '@angular/core';
import { Category } from '../../shared/model/category';
import { Language } from '../../shared/model/language';
import { CommonModule } from '@angular/common';
import { DialogComponent } from '../matching-game/dialog/dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { Router } from '@angular/router';
import { GamePoint } from '../../shared/model/game-points';
import { MatIconModule } from '@angular/material/icon';
import { TimerComponent } from '../timer/timer.component';
import { PointsService } from '../services/points-service';
import { GamePlayed } from '../../shared/model/game-played';

@Component({
  selector: 'app-mixed-game',
  standalone: true,
  imports: [CommonModule, MatProgressBarModule, MatIconModule, TimerComponent],
  templateUrl: './mixed-game.component.html',
  styleUrl: './mixed-game.component.css',
})
export class MixedGameComponent {
  constructor(
    private dialogService: MatDialog,
    private router: Router,
    private pointService: PointsService
  ) {}

  currentCategory: Category = new Category(
    '',
    '',
    Language.English,
    Language.Hebrew
  );
  level: number = 0;
  origin: string[] = [];
  target: string = '';
  inputValue: string = '';
  currentPoint: number = 0;
  attemptsCount: number = 0;
  successesCount: number = 0;

  timeLeft: number = 0;

  ngOnInit(): void {
    this.currentCategory = JSON.parse(
      localStorage.getItem('currentCategory') || ''
    ) as Category;
    this.target = this.currentCategory.words[this.level].target;
    this.origin = this.mixedOrigin(
      this.currentCategory.words[this.level].origin
    );
  }

  nextWord() {
    console.log(this.level);
    console.log(this.currentCategory.words);
    console.log(this.currentCategory.words.length);

    if (this.currentCategory.words.length > this.level) {
      if (this.inputValue === this.currentCategory.words[this.level].origin) {
        this.dialogService.open(DialogComponent, { data: true });
        this.currentCategory.words[this.level].guess = 'true';
        this.successesCount += 1;
        this.attemptsCount += 1;
        this.currentPoint += 100 / this.currentCategory.words.length;
      } else {
        this.dialogService.open(DialogComponent, { data: false });
        this.currentCategory.words[this.level].guess = 'false';
        this.attemptsCount += 1;
      }
      this.resetValue();

      if (this.currentCategory.words.length > this.level + 1) {
        this.target = this.currentCategory.words[this.level + 1].target;
        this.origin = this.mixedOrigin(
          this.currentCategory.words[this.level + 1].origin
        );
      } else {
        const game: GamePoint = new GamePoint(
          this.currentCategory.id,
          this.currentCategory.name,
          this.currentPoint,
          this.currentCategory.words,
          this.attemptsCount,
          this.successesCount
        );
        localStorage.setItem('gameResult', JSON.stringify(game));
        this.pointService.addGamePlayed(
          new GamePlayed(
            this.currentCategory.id,
            2,
            new Date(),
            this.currentPoint,
            this.timeLeft,
            180 - this.timeLeft
          )
        );
        this.router.navigate(['resultmixedgame']);
      }
      this.level += 1;
    }
  }

  handleChange(event: Event) {
    this.inputValue = (event.target as HTMLInputElement).value;
  }
  resetValue() {
    this.inputValue = '';
  }

  shuffleArray(array: string[]) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  mixedOrigin(origin: string) {
    const characters = origin.split('');
    const randomizedArray = this.shuffleArray(characters);
    return randomizedArray;
  }

  calculateProgress(): number {
    const totalItems = this.currentCategory.words.length;
    const completedItems = this.level;

    const progress = (completedItems / totalItems) * 100;
    return progress;
  }

  reportTimeLeft(newTime: number) {
    this.timeLeft = newTime;
    if (newTime == 0) {
      console.log('points when time is over ' + this.currentPoint);
      const game: GamePoint = new GamePoint(
        this.currentCategory.id,
        this.currentCategory.name,
        this.currentPoint,
        this.currentCategory.words,
        this.attemptsCount,
        this.successesCount
      );
      localStorage.setItem('gameResult', JSON.stringify(game));
      this.pointService.addGamePlayed(
        new GamePlayed(
          this.currentCategory.id,
          2,
          new Date(),
          this.currentPoint,
          0,
          180
        )
      );
      this.router.navigate(['resultmixedgame']);
    }
  }
}
