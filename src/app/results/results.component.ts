import { Component, OnInit } from '@angular/core';
import { Score } from '../score';
import { QuizService } from '../quiz.service';
import { QuestionResult } from '../question-result';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit {

  userScore: Score;
  quizResults: QuestionResult[];

  constructor(private quiz: QuizService) { }

  ngOnInit() {
    this.userScore = this.quiz.getUserScore();
    this.quizResults = this.quiz.getQuizResults();
  }

  answerIsCorrect(index: number): boolean {
    let result = this.quizResults[index];
    return result.question.answer === result.response;
  }

}
