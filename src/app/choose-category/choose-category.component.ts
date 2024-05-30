import { Component, OnInit } from '@angular/core';
import { Category } from '../../shared/model/category';
import { CategoriesService } from '../services/categories.service';
import { CommonModule } from '@angular/common';
import { CategoryCardComponent } from '../category-card/category-card.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-choose-category',
  templateUrl: './choose-category.component.html',
  styleUrls: ['./choose-category.component.css'],
  standalone: true,
  imports: [CommonModule, CategoryCardComponent, RouterLink],
})
export class ChooseCategoryComponent implements OnInit {
  isLaodingDone = false;
  openGameSelectionDialog() {
    throw new Error('Method not implemented.');
  }

  allCategotys: Category[] = [];
  constructor(private categoryService: CategoriesService) {}
  ngOnInit(): void {
    this.categoryService.list().then((result: Category[]) => {
      this.allCategotys = result;
      this.isLaodingDone = true;
    });
  }
}
