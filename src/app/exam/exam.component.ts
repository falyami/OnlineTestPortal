import { AuthService } from '../auth/auth.service';
import { IResult } from '../interfaces/iresult';
import { IExam } from '../interfaces/iexam';
import { ExamService } from '../services/exam.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IQuestion } from '../interfaces/iquestion';

@Component({
  selector: 'app-exam',
  templateUrl: './exam.component.html',
  styleUrls: ['./exam.component.css']
})

export class ExamComponent implements OnInit {
  // Declare Properties, Objects, & Arrays
  form: FormGroup = new FormGroup({});
  submitted: boolean = false;
  exams: IExam[] = [];
  questions: IQuestion[] = [];
  results: IResult[] = [];
  exam: IExam = {
    id: null,
    title: null,
    grade: null,
    questions: []
  };
  examTitle: string = '';
  result: IResult = {
    username: null,
    examid: null,
    grade: null
  };
  total: number = 0;
  successFlag: boolean = false;

  constructor(private examService: ExamService,
    private authService: AuthService) { }

  ngOnInit() {
    // Declare FormGroup to Hold Dynamic Controls
    let group: FormGroup = new FormGroup({});
    // Call getExams Method to View Exam Information
    this.examService.getExams().subscribe(list => {
      this.exams = [];
      this.exams = list.map(item => {
        return {
          $key: item.key,
          ...item.payload.val()
        };
      });
      // Find Exam by Id
      this.exam = this.exams.find(e => e.id = 1);
      if (this.exam) {
        this.examTitle = this.exam.title;
      }
    });

    // Call getQuestions Method to Fill Form with Exam Questions
    this.examService.getQuestions().subscribe(list => {
      this.questions = [];
      this.questions = list.map(item => {
        return {
          $key: item.key,
          ...item.payload.val()
        };
      });
      // Find Questions by Exam Id
      this.questions = this.questions.filter(q => q.examid = 1);
      if (this.questions.length > 0) {
        // Create FormControl based on Number of Questions in Exam
        this.questions.forEach(question => {
          group.addControl(question.id.toString(), new FormControl('', Validators.required))
        });
      }
    });
    this.form = group;
  }

  // Method to Validate Form & Submit Answers
  onSubmit() {
    // Assign Values to Variables
    this.submitted = true;
    this.successFlag = false;
    this.total = 0;
    // Validate Form Entries
    if (this.form.invalid) {
      return;
    }
    // Grade Submitted Answers
    this.questions.forEach(question => {
      this.total += (JSON.parse(this.form.controls[question.id].value) === question.answer) ? question.grade : 0;
    });
    // Call getResults() Method to Find User Result
    this.examService.getResults().subscribe(list => {
      this.results = [];
      this.results = list.map(item => {
        return {
          $key: item.key,
          ...item.payload.val()
        };
      });
      // Prepare & Insert User Result into result Object
      this.result = this.results.find(r => (r.username == this.authService.getUsername() && r.examid == 1));
      if (this.result) {
        this.result.grade = this.total;
        // Call updateExamGrade Method to Update Grade
        this.examService.updateExamGrade(this.result);
        // Flag to Show Success Message
        this.successFlag = true;
      }
    });
  }
}