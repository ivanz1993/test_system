import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Result } from '../models/Result';
import { Inject, Component } from '@angular/core';

@Component({
    selector: 'result-dialog',
    templateUrl: 'result-dialog.html',
  })
  export class ResultDialogComponent {
  
    constructor(
      public dialogRef: MatDialogRef<ResultDialogComponent>,
      @Inject(MAT_DIALOG_DATA) public data: Result) {}
  
    Ok(): void {
      this.dialogRef.close();
    }
  }