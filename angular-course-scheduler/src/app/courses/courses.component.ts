import { Component, OnInit } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Subject } from 'rxjs';
import { Course } from '../course';
import { HttpClient } from '@angular/common/http';
//import { courseList } from '../mock-courses';

export class Courses {
  constructor(
    public subject: string,
    public catalog_nbr: string,
    public className: string
  ) {
  }
}

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})

export class CoursesComponent implements OnInit {

searchText;

searchCN;

searchComponent = '';

courses: Courses[];

//courses = courseList;

selectedCourse: Course;

  constructor(private httpClient: HttpClient) { }

  ngOnInit(): void {
    this.getCourses();
  }

  onSelect(course: Course): void {
    this.selectedCourse = course;
  }

  OnSave(event: any) {
    this.selectedCourse = this.searchText;
    }

  searchCourses(){

        const a = document.getElementById('courseSearch');
        a.innerHTML = "";
        const subjectSearch = (<HTMLInputElement>document.getElementById('subjectSearch1')).value.toUpperCase();
        const cnSearch = (<HTMLInputElement>document.getElementById('cnSearch1')).value.toUpperCase();
        const componentSearch = (<HTMLInputElement>document.getElementById('componentSearch1')).value.toUpperCase();
        this.courses.forEach(e => {
            const subjects1 = e["subject"];
            const cN1 = e["catalog_nbr"];
            const components1 = e["course_info"][0]["ssr_component"];
            let h3s = document.createElement('h3');
            let ps = document.createElement('p');
            let p2s = document.createElement('p');
            let p3s = document.createElement('p');
            var br = document.createElement('br');

            if (subjectSearch == subjects1 && cnSearch == cN1 && componentSearch == ""){
              // Input sanitization checks for valid characters\
              h3s.appendChild(document.createTextNode(`${e["subject"]} ${e["catalog_nbr"]} - ${e["className"]} `));
              ps.appendChild(document.createTextNode(`${e["catalog_description"]}`));
              p2s.appendChild(document.createTextNode(`LEC ${e["course_info"][0]["start_time"]} to ${e["course_info"][0]["end_time"]}`));
              p3s.appendChild(document.createTextNode(`${e["course_info"][0]["ssr_component"]} Section: ${e["course_info"][0]["class_section"]}`));
              a.appendChild(h3s);
              a.appendChild(ps);
              a.appendChild(p2s);
              a.appendChild(p3s);
            }
        
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
        this.courses = response;
      });
    }

}
