import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Category } from '../models/category';
import { Question } from '../models/question';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  myAppUrl: string;
  myApiUrl: string;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8'
    })
  };
  constructor(private http: HttpClient) {
    this.myAppUrl = environment.appUrl;
    this.myApiUrl = 'api/categories/';
  }

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.myAppUrl + this.myApiUrl)
      .pipe(
        retry(1),
        catchError(this.errorHandler)
      );
  }

  getBlogPost(postId: number): Observable<Category> {
    return this.http.get<Category>(this.myAppUrl + this.myApiUrl + postId)
      .pipe(
        retry(1),
        catchError(this.errorHandler)
      );
  }

  getQuestions(categoryId: number): Observable<Question[]> {
    return this.http.get<Question[]>(this.myAppUrl + "api/questions/category/" + categoryId)
      .pipe(
        retry(1),
        catchError(this.errorHandler)
      );
  }

  submitQuestion(question): Observable<Question> {
    return this.http.post<Question>(this.myAppUrl + this.myApiUrl, JSON.stringify(question), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.errorHandler)
      );
  }

  
  saveCategory(category): Observable<Category> {
    return this.http.post<Category>(this.myAppUrl + this.myApiUrl, JSON.stringify(category), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.errorHandler)
      );
  }

  updateCategory(category): Observable<Category> {
    return this.http.put<Category>(this.myAppUrl + this.myApiUrl, JSON.stringify(category), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.errorHandler)
      );
  }
  
 
 

  

  errorHandler(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}
