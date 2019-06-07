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

  private userResponses: any;
  private userScore: Score;

  constructor(private http: HttpClient, private router: Router) { }

  getUserResponses(): any {
    return this.userResponses;
  }

  getUserScore(): Score {
    return this.userScore;
  }

  getQuestions(): Observable<any> {
    return this.http.get("/questions", { responseType: "json" });
  }

  getScores(): Observable<any> {
    return this.http.get("/scores", { responseType: "json" });
  }

  addScore(score: Score): Observable<any> {
    return this.http.post("/scores", score, { responseType: "json" });
  }

  calculateScore(username: string, questions: Question[], responses: any): void {
    this.userResponses = responses; //save the responses

    //calculate the score
    let score = 0;
    for (let i = 0; i < questions.length; ++i) {
      if (questions[i].answer === this.userResponses[`question${i}`]) {
        score++;
      }
    }

    //make the score object, then post it
    this.userScore = {
      username: username,
      score: score
    };
    console.log(this.userScore);
    this.addScore(this.userScore);

    this.router.navigate(["/results"]);
  }
}
