import { Component, Inject, Input } from '@angular/core';
import { Category } from '../../shared/model/category';
import { MatCardModule } from '@angular/material/card';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { GameService } from '../services/game/game-service';

@Component({
  selector: 'app-category-card',
  standalone: true,
  imports: [MatCardModule],
  templateUrl: './category-card.component.html',
  styleUrl: './category-card.component.css'
})
export class CategoryCardComponent {
  constructor(
    private dialogService : MatDialog,gameService:GameService){}
  @Input()
  currentcategory? : Category;


  openDialog() {
    let dialogRef = this.dialogService.open(DialogComponent,{data:this.currentcategory});
  }
 
}
