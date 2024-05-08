import { Component, OnInit } from '@angular/core';
import { Category } from '../../shared/model/category';
import { CategoriesService } from '../services/categories.service';
import { CommonModule } from '@angular/common';
import { CategoryCardComponent } from '../category-card/category-card.component';

@Component({
  selector: 'app-choose-category',
  templateUrl: './choose-category.component.html',
  styleUrls: ['./choose-category.component.css'],
  standalone: true,
  imports: [CommonModule, CategoryCardComponent]
})
export class ChooseCategoryComponent implements OnInit{
openGameSelectionDialog() {
throw new Error('Method not implemented.');
}

   allCategotys : Category[] = [];
 constructor(private categoryService : CategoriesService) {}
 ngOnInit(): void {
 this.allCategotys = this.categoryService.list();
 }
}
