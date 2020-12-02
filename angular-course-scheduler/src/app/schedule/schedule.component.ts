import { Component, OnInit } from '@angular/core';
import { Course } from '../course';
//import { courseList } from '../mock-courses';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
//import 'rxjs/add/operator/toPromise';

export class Courses {
  constructor(
    public subject: string,
    public catalog_nbr: string,
    public className: string
  ) {
  }
}

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent implements OnInit {

courses1: Courses[];

searchText;

searchCN;

searchComponent = '';

scheduleN;

selectedCourse: Course;

schedule: ScheduleComponent;

  constructor(private httpClient: HttpClient) { }
  

  ngOnInit(): void {
    this.getCourses();
  }

  onSelect(course: Course): void {
    this.selectedCourse = course;
  }

  scheduleName(){
    const s = (<HTMLInputElement>document.getElementById('scheduleN')).value;
    const l = document.getElementById('sName');
    const item = document.createElement('li');
    let h3 = document.createElement('h3');
    h3.appendChild(document.createTextNode('Schedule Name: ' + s));
        l.appendChild(h3);
  }

  addToSchedule(){
        const a = document.getElementById('schedule');
        const subjectSearch = (<HTMLInputElement>document.getElementById('subjectSearch')).value.toUpperCase();
        const cnSearch = (<HTMLInputElement>document.getElementById('cnSearch')).value.toUpperCase();
        const componentSearch = (<HTMLInputElement>document.getElementById('componentSearch')).value.toUpperCase();
        this.courses1.forEach(e => {
            const subjects1 = e["subject"];
            const cN1 = e["catalog_nbr"];
            const components1 = e["course_info"][0]["ssr_component"];
            let h3s = document.createElement('h3');
            let ps = document.createElement('p');
            let p2s = document.createElement('p');
            var br = document.createElement('br');
        
            if (subjectSearch == subjects1 && cnSearch == cN1 && componentSearch == components1){
                // Input sanitization checks for valid characters
                h3s.appendChild(document.createTextNode(`${e["subject"]} ${e["catalog_nbr"]} - ${e["className"]} `));
                ps.appendChild(document.createTextNode(`${e["catalog_description"]}`));
                p2s.appendChild(document.createTextNode(`${e["course_info"][0]["ssr_component"]} Section: ${e["course_info"][0]["class_section"]}`));
                a.appendChild(h3s);
                a.appendChild(ps);
                a.appendChild(p2s);
        }
       });
  }

 getCourses(){
    this.httpClient.get<any>("http://localhost:3000/api/courses").subscribe(
      response => {
      console.log(response);
      this.courses1 = response;
    });
  }
}
