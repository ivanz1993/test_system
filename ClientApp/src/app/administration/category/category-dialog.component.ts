import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject, Component } from '@angular/core';
import { Category } from 'src/app/models/category';
import { CategoryService } from 'src/app/services/category.service';

@Component({
    selector: 'category-dialog',
    templateUrl: 'category-dialog.component.html',
  })
  export class CategoryDialogComponent {
  category: Category;

    constructor(
      private categoryService: CategoryService,
      public dialogRef: MatDialogRef<Category>,
      @Inject(MAT_DIALOG_DATA) public data: Category) {
        this.category = data;
      }
  
    save(): void {
      if (this.category.id > 0){
        this.categoryService.updateCategory(this.category).subscribe(category => {
             window.location.reload();
         });
      } else{
        this.categoryService.saveCategory(this.category).subscribe(category => {
          window.location.reload();
        });
      }
    }
  }