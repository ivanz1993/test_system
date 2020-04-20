import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CategoryComponent } from './categories/categories.component';
import { CategoryService } from './services/category.service';
import { QuestionsComponent } from './questions/questions.component';
import { QuestionService } from './services/question.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { ResultDialogComponent } from './questions/result.dialog';
import { ManagementCategoryComponent } from './administration/categories/management-categories.component';
import { CategoryDialogComponent } from './administration/category/category-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    CategoryComponent,
    QuestionsComponent,
    ResultDialogComponent,
    ManagementCategoryComponent,
    CategoryDialogComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatDialogModule
  ],
  providers: [
    CategoryService,
    QuestionService
  ],
  entryComponents: [ ResultDialogComponent, CategoryDialogComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
