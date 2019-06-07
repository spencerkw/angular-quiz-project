import { Component, OnInit } from '@angular/core';
import { QuizService } from '../quiz.service';
import { Question } from '../question';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {

  username: string = null;
  questions: Question[];

  constructor(private quiz: QuizService) { }

  ngOnInit() {
    this.getQuestions();
  }

  getQuestions(): void {
    this.quiz.getNewQuestions().subscribe(response => {
      this.questions = response;
      this.quiz.storeQuestions(this.questions);
    });
  }

  setUsername(username: string): void {
    if (username) {
      this.username = username;
    }
  }

  submitQuiz(form): void {
    console.log(form.value);
    this.quiz.calculateScore(this.username, form.value);
  }

}
