import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

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

  constructor (private http: HttpClient){}

  getCourses(){
    this.courses = this.http.get("http://localhost:3000/api/courses")
  }
  
}
