import { Component, OnInit } from '@angular/core';
import { Score } from '../score';
import { QuizService } from '../quiz.service';
import { Question } from '../question';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit {

  userScore: Score;
  questions: Question[];
  userResponses: any;

  constructor(private quiz: QuizService) { }

  ngOnInit() {
    this.userScore = this.quiz.getUserScore();
    this.questions = this.quiz.getStoredQuestions();
    this.userResponses = this.quiz.getUserResponses();
  }

  getResponse(index: number) {
    return this.userResponses[`question${index}`];
  }

}
