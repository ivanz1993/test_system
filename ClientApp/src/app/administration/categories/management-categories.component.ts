import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CategoryService } from '../../services/category.service';
import { Category } from '../../models/category';
import { CategoryDialogComponent } from '../category/category-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-management-categories',
  templateUrl: './management-categories.component.html',
  styleUrls: ['./management-categories.component.scss']
})
export class ManagementCategoryComponent implements OnInit {
  categories$: Observable<Category[]>;
  newCategory: Category = new Category();
  constructor(private categoryService: CategoryService, public dialog: MatDialog) {
  }

  ngOnInit() {
    this.loadCategories();
  }

  loadCategories() {
    this.categories$ = this.categoryService.getCategories();
  }

  openManagementDialog(resultScore): void {
    const dialogRef = this.dialog.open(CategoryDialogComponent, {
      width: '250px',
      data: resultScore
    });
   }

}
