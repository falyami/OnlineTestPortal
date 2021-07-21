import { UserService } from '../services/user.service';
import { ExamService } from '../services/exam.service';
import { IUser } from '../interfaces/iuser';
import { Component, OnInit } from '@angular/core';
import { IExam } from '../interfaces/iexam';
import { IResult } from '../interfaces/iresult';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})

export class ResultsComponent implements OnInit {
  // Declare Properties, Objects, & Arrays
  exams: IExam[] = [];
  examTitle: string = '';
  examTotalGrade: number = 0;
  results: IResult[] = [];
  users: IUser[] = []
  exam: IExam = {
    id: null,
    title: null,
    grade: null,
    questions: []
  };
  finalResults = [];
  status: string = '';

  constructor(private examService: ExamService, private userService: UserService) { }

  ngOnInit(): void {
    // Call getUsers() Method to Retreive Users
    this.userService.getUsers().subscribe(list => {
      this.users = [];
      this.users = list.map(item => {
        return {
          $key: item.key,
          ...item.payload.val()
        };
      });
    });

    // Call getResults() Method to View Exam Results
    this.examService.getResults().subscribe(list => {
      this.results = [];
      this.results = list.map(item => {
        return {
          $key: item.key,
          ...item.payload.val()
        };
      });
      // Find Results by Exam Id
      this.results = this.results.filter(r => r.examid == 1);
      if (this.results.length > 0) {
        this.finalResults = this.mergeTwoLists(this.users, this.results);
      }
    });

    // Call getExams() Method to View Exam Information
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
        this.examTotalGrade = this.exam.grade;
      }
    });
  }

  // Method to Merge Lists by Username
  mergeTwoLists = (list1, list2) =>
    list1 = list1.filter(u => u.type === 'user').map(element => ({
      ...list2.find((item) => (item.username === element.username)),
      ...element
    }));

  // Method to Check User Exam Status
  checkExamStatus(grade: number, total: number) {
    return ((grade / total) * 100 >= 50) ? true : false;
  }
}