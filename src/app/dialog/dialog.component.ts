import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent } from '@angular/material/dialog';
import { GameService } from '../services/game/game-service';
import { GameDifficulty } from '../../shared/model/game-difficulty';
import { RouterModule } from '@angular/router';
import { Category } from '../../shared/model/category';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-dialog',
  standalone: true,
  imports:[
    MatButtonModule,
    MatDialogContent,
    MatDialogActions,NgFor,
    MatDialogClose,
    RouterModule
  ],
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogComponent implements OnInit {
  public selectedValue: number = 2;
  public selectedRoute: string = 'matching';
  public gameDetails: any; // Change the type as per your GameService
  public selectedGameId: number | undefined;
  public difficulty: string = 'easy';
  public description: string = '';

  constructor(@Inject(MAT_DIALOG_DATA) public currentcategory: Category, private gameService: GameService) {}

  ngOnInit(): void {
    this.gameDetails = this.gameService.getGames();
    this.setDefaultValues();
  }

  onSelectChange(event: any): void {
    this.selectedValue = Number(event.target.value);

    const selectedGame = this.gameDetails.find((game: any) => game.id === this.selectedValue);
    if (selectedGame) {
      this.description = selectedGame.description || '';
      this.selectedRoute = selectedGame.url || '';
      this.setDifficulty(selectedGame.difficulty);
    }
  }
  sendCategoryGame(): void {
    localStorage.setItem('currentCategory', JSON.stringify(this.currentcategory));
  }

  private setDefaultValues(): void {
    const defaultGame = this.gameDetails[0];
    this.description = defaultGame.description || '';
    this.selectedRoute = defaultGame.url || '';
    this.setDifficulty(defaultGame.difficulty);
  }

  private setDifficulty(difficulty: GameDifficulty): void {
    switch (difficulty) {
      case GameDifficulty.EASY:
        this.difficulty = 'easy';
        break;
      case GameDifficulty.MEDIUM:
        this.difficulty = 'medium';
        break;
      case GameDifficulty.HARD:
        this.difficulty = 'hard';
        break;
      default:
        this.difficulty = 'unknown';
        break;
    }
  }
}
