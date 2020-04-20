import { Component, OnInit, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { CategoryService } from '../services/category.service';
import { ActivatedRoute } from '@angular/router';
import { Question } from '../models/question';
import { QuestionService } from '../services/question.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Result } from '../models/Result';
import { ResultDialogComponent } from './result.dialog';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.scss']
})

export class QuestionsComponent implements OnInit {
  questions: Question[];
  id:number;
  result: Result;

 


  constructor(private categoryService: CategoryService, private questionService: QuestionService,
              private avRoute: ActivatedRoute, public dialog: MatDialog) {
    const idParam = 'id';
    if (this.avRoute.snapshot.params[idParam]) {
      this.id = this.avRoute.snapshot.params[idParam];
    }
  }

  ngOnInit() {
    this.loadQuestions();
  }

  loadQuestions() {
    this.categoryService.getQuestions(this.id).subscribe(questions => {
      this.questions = questions as Question[]
     });
   }

  submit(){
    debugger
    console.log(this.questions)
    this.questionService.submitQuestion(this.questions) .subscribe((data) => {
      this.openDialog(data);
    });
  }

  openDialog(resultScore): void {
    const dialogRef = this.dialog.open(ResultDialogComponent, {
      width: '250px',
      data: resultScore
    });
   }
}
