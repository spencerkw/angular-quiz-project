import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Score } from './score';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  constructor(private http: HttpClient) { }

  getQuestions(): Observable<any> {
    return this.http.get("/questions", { responseType: "json" });
  }

  getScores(): Observable<any> {
    return this.http.get("/scores", { responseType: "json" });
  }

  addScore(score: Score): Observable<any> {
    return this.http.post("/scores", score, { responseType: "json" });
  }
}
