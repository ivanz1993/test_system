import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CategoryComponent } from './categories/categories.component';
import { QuestionsComponent } from './questions/questions.component';
import { ManagementCategoryComponent } from './administration/categories/management-categories.component';

const routes: Routes = [
  { path: '', component: CategoryComponent, pathMatch: 'full' },
  { path: 'questions/:id', component: QuestionsComponent },
  {path: 'management-categories', component: ManagementCategoryComponent},
  { path: '**', redirectTo: '/' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
