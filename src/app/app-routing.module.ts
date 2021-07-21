import { LoginComponent } from './login/login.component';
import { ResultsComponent } from './results/results.component';
import { ExamComponent } from './exam/exam.component';
import { HomeComponent } from './home/home.component';
import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent},
  { path: 'exam', component: ExamComponent, canActivate: [AuthGuard], data: { role: 'user'}},
  { path: 'results', component: ResultsComponent, canActivate: [AuthGuard], data: { role: 'admin'}}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
