import { Component, NgModule, NgModuleRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { Category } from '../../../shared/model/category';
import { Language } from '../../../shared/model/language';
import { TranslatedWord } from '../../../shared/model/translated-word';
import { WordStatus } from '../../../shared/model/matching-game-model';
import { WordComponent } from '../word/word.component';
import { DialogComponent } from '../dialog/dialog.component';
import { PointsService } from '../../../../src/app/services/points-service';
import { GamePoint } from '../../../shared/model/game-points';



@Component({
  selector: 'app-matching-game',
  standalone: true,
  imports: [WordComponent,CommonModule,MatIconModule,DialogComponent],
  templateUrl: './matching-game.component.html',
  styleUrl: './matching-game.component.css',
})



export class MatchingGameComponent {
  currentCategory: Category = new Category(0, '', Language.English, Language.Hebrew);
  currentCards: TranslatedWord[] = [];
  shuffleTarget: string[] = [];
  targets: string[] = [];
  targetStatus: WordStatus[] = [WordStatus.NORMAL, WordStatus.NORMAL, WordStatus.NORMAL, WordStatus.NORMAL, WordStatus.NORMAL];
  originStatus: WordStatus[] = [WordStatus.NORMAL, WordStatus.NORMAL, WordStatus.NORMAL, WordStatus.NORMAL, WordStatus.NORMAL];
  attemptsCount = 0;
  successesCount = 0;
  currentPointsCount = 0;
  pointsForCurrentRoundCount = 0;

  constructor(private dialogService: MatDialog, private router: Router) {
    this.initGame();
  }

  initGame(): void {
    this.pointsForCurrentRoundCount = 100;
    this.currentCategory = JSON.parse(localStorage.getItem("currentCategory") || '') as Category;
    if (this.currentCategory.words.length >= 5) {
      this.choose5words();
      this.shuffle();
    } else {
      alert('error');
    }
  }

  choose5words(): void {
    let choose: TranslatedWord[] = [];
    for (let i = 0; i < 5; i++) {
      const randomIndex = Math.floor(Math.random() * this.currentCategory.words.length);
      if (!choose.includes(this.currentCategory.words[randomIndex])) {
        choose.push(this.currentCategory.words[randomIndex]);
      } else {
        i--;
      }
    }
    this.currentCards = choose;
  }

  shuffle(): void {
    let shuffleTargetTemp: string[] = this.currentCards.map((current) => (current.target));
    for (let i = shuffleTargetTemp.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffleTargetTemp[i], shuffleTargetTemp[j]] = [shuffleTargetTemp[j], shuffleTargetTemp[i]];
    }
    this.shuffleTarget = shuffleTargetTemp;
  }

  chooseCard(cat: string, i: number): void {
    const isOrigin = cat === 'origin';
    const statusArray = isOrigin ? this.originStatus : this.targetStatus;
    const oppositeStatusArray = isOrigin ? this.targetStatus : this.originStatus;
    const currentCard = isOrigin ? this.currentCards[i] : this.currentCards.find(card => card.target === this.shuffleTarget[i]);
  
    if (statusArray[i] === WordStatus.NORMAL) {
      statusArray[i] = WordStatus.SELECTED;
      
      // Reset other selected card of the same category
      for (let j = 0; j < statusArray.length; j++) {
        if (i !== j && statusArray[j] === WordStatus.SELECTED) {
          statusArray[j] = WordStatus.NORMAL;
          break;
        }
      }
  
      // Check for match with selected card of the opposite category
      for (let j = 0; j < oppositeStatusArray.length; j++) {
        if (oppositeStatusArray[j] === WordStatus.SELECTED) {
          const check = isOrigin ? this.currentCards.find(card => card.target === this.shuffleTarget[j]) : this.currentCards[j];
          
          if (check?.origin === (currentCard?.origin ?? '')) {
            this.dialogService.open(DialogComponent, { data: true });
            oppositeStatusArray[j] = WordStatus.DISABLED;
            statusArray[i] = WordStatus.DISABLED;
            this.attemptsCount++;
            this.successesCount++;
          } else {
            this.dialogService.open(DialogComponent, { data: false });
            this.pointsForCurrentRoundCount -= 2;
            this.attemptsCount++;
            this.cleanArray();
          }
        }
      }
    }
    
    this.finishGame();
  }
  
  cleanArray(): void {
    for (let i = 0; i < this.targetStatus.length; i++) {
      if (this.targetStatus[i] === WordStatus.SELECTED) {
        this.targetStatus[i] = WordStatus.NORMAL;
      }
      if (this.originStatus[i] === WordStatus.SELECTED) {
        this.originStatus[i] = WordStatus.NORMAL;
      }
    }
  }

  finishGame(): void {
    for (let i = 0; i < this.originStatus.length; i++) {
      if (this.originStatus[i] !== WordStatus.DISABLED) {
        return;
      }
    }
    const game: GamePoint = new GamePoint(this.currentCategory.id, this.currentCategory.name, this.pointsForCurrentRoundCount, this.currentCards, this.attemptsCount, this.successesCount);
    localStorage.setItem("gameResult", JSON.stringify(game));
    this.router.navigate(['result']);
  }
}
