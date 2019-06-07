import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Score } from './score';
import { Question } from './question';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  private quizQuestions: Question[];
  private userResponses: any;
  private userScore: Score;

  constructor(private http: HttpClient, private router: Router) { }

  getUserResponses(): any {
    return this.userResponses;
  }

  getUserScore(): Score {
    return this.userScore;
  }

  getStoredQuestions(): Question[] {
    return this.quizQuestions;
  }

  storeQuestions(questions: Question[]): void {
    this.quizQuestions = questions;
  }

  getNewQuestions(): Observable<any> {
    return this.http.get("/api/questions", { responseType: "json" });
  }

  getScores(): Observable<any> {
    return this.http.get("/api/scores", { responseType: "json" });
  }

  addScore(score: Score): Observable<any> {
    return this.http.post("/api/scores", score, { responseType: "json" });
  }

  calculateScore(username: string, responses: any): void {
    this.userResponses = responses; //save the responses

    //calculate the score
    let score = 0;
    for (let i = 0; i < this.quizQuestions.length; ++i) {
      if (this.quizQuestions[i].answer === this.userResponses[`question${i}`]) {
        score++;
      }
    }

    //make the score object, then post it
    this.userScore = {
      username: username,
      score: score
    };
    //post the score, then move to results
    this.addScore(this.userScore).subscribe(() => {
      this.router.navigate(["/results"]);
    });
  }

  resetQuiz(): void {
    this.quizQuestions = null;
  }
}
