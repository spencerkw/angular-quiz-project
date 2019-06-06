import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { QuizComponent } from './quiz/quiz.component';
import { ResultsComponent } from './results/results.component';
import { ScoresComponent } from './scores/scores.component';

import { QuizService } from './quiz.service';

@NgModule({
  declarations: [
    AppComponent,
    QuizComponent,
    ResultsComponent,
    ScoresComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [QuizService],
  bootstrap: [AppComponent]
})
export class AppModule { }
