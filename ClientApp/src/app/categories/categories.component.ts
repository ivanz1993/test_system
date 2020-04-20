import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CategoryService } from '../services/category.service';
import { Category } from '../models/category';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoryComponent implements OnInit {
  categories$: Observable<Category[]>;

  constructor(private categoryService: CategoryService) {
  }

  ngOnInit() {
    this.loadCategories();
  }

  loadCategories() {
    this.categories$ = this.categoryService.getCategories();
  }

}
