import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'Academic Timetable Creator';
  secondHeading = 'Courses at Western';
  subject = 'Subject: ';
  courseNumber = 'Course Number: ';
  component = 'Component: ';

  courses: any;

  constructor (private http: HttpClient, private router: Router){}

  getCourses(){
    this.courses = this.http.get("http://localhost:3000/api/courses")
  }

  goToPage(pageName:string):void{
    this.router.navigate([`${pageName}`]);
  }
  
}
