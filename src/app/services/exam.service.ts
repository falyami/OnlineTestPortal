import { IExam } from '../interfaces/iexam';
import { IResult } from '../interfaces/iresult';
import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})

export class ExamService {
  // Declare Properties, Objects, & Arrays
  exams: AngularFireList<any>;
  questions: AngularFireList<any>;
  results: AngularFireList<any>;
  examsList: IExam[] = [];

  constructor(private firebase: AngularFireDatabase) {
    // Get Data from Database
    this.questions = this.firebase.list('questions');
    this.results = this.firebase.list('results');
    this.exams = this.firebase.list('exams');
  }

  // Method to Retreive List of Questions
  getQuestions() {
    return this.questions.snapshotChanges();
  }

  // Method to Retreive List of Exams
  getExams() {
    return this.exams.snapshotChanges();
  }

  // Method to Retreive List of Results
  getResults(): any {
    return this.results.snapshotChanges();
  }

  // Method to Update Exam Grade of User
  updateExamGrade(result: IResult): void {
    let $key = result.$key;
    delete result.$key;
    this.results.update($key, result);
  }
}