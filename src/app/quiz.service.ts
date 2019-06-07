import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { Score } from './score';
import { Question } from './question';
import { QuestionResult } from './question-result';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  private quizResults: QuestionResult[];
  private userScore: Score;

  constructor(private http: HttpClient, private router: Router) { }

  getQuizResults(): any {
    return this.quizResults;
  }

  getUserScore(): Score {
    return this.userScore;
  }

  getQuestions(): Observable<any> {
    return this.http.get("/api/questions", { responseType: "json" });
  }

  getScores(): Observable<any> {
    return this.http.get("/api/scores", { responseType: "json" });
  }

  addScore(score: Score): Observable<any> {
    return this.http.post("/api/scores", score, { responseType: "json" });
  }

  calculateScore(username: string, questions: Question[], responses: any): void {
    this.quizResults = [];

    //calculate the score
    let score = 0;
    for (let i = 0; i < questions.length; ++i) {
      let result: QuestionResult = {
        question: questions[i],
        response: responses[`question${i}`]
      };
      this.quizResults.push(result);

      if (result.question.answer === result.response) {
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
}
