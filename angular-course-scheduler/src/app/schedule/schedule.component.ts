import { Component, OnInit } from '@angular/core';
import { Course } from '../course';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent implements OnInit {

dName: String;
sName: String;
description: String;
visibility: String;

subject: String;
catalog_nbr: String;
end: String;

oldName: String;
newName: String;
newDescription: String;
newVisibility: String;

schedule: 
  {
    visibility: String,
    _id: String,
    name: String,
    username: String,
    description: String,
    courseList: [],
    date: String,
  };

result: String;

  constructor(private http: HttpClient) { }
  

  ngOnInit(): void {
  }


  scheduleName(){

    let url = "http://localhost:3000/api/schedule";

    this.http.post(url,{
      name: this.sName,
      username: this.dName,
      description: this.description,
      visibility: this.visibility
    }).toPromise().then((data: any) => {
      this.result = JSON.stringify(data.any);
      alert(this.result);
    })
  }

  addToSchedule(){

    let url = "http://localhost:3000/api/schedule/name";

    if (!this.subject){
      alert('Please enter in a subject');
    }

    if (!this.catalog_nbr){
      alert('Please enter in a catalog_nbr');
    }

    this.http.post(url,{
      name: this.sName,
      subject: this.subject,
      catalog_nbr: this.catalog_nbr,
    }).toPromise().then((data: any) => {
      //console.log(data.json);
      this.result = JSON.stringify(data.any);
      alert(this.result);
    })
  }

  editSchedule(){
    let url = "http://localhost:3000/api/schedule/name";
    this.http.patch(url,{
      oldname: this.oldName,
      newname: this.newName,
      description: this.newDescription,
      visibility: this.newVisibility
    })
    .toPromise().then((data: any) => {
      this.result = JSON.stringify(data.any);
      alert(this.result);
    })
  }

  deleteSchedule(){
    let url = "http://localhost:3000/api/schedule/";
    this.http.delete(url + this.sName)
    .toPromise().then((data: any) => {
      //console.log(data.json);
      this.result = JSON.stringify(data.any);
      alert(this.result);
    })

  }

  getSchedule(){

    let url = "http://localhost:3000/api/schedule/";

    this.http.get(url + this.sName)
    .toPromise().then((data: any) => {
      this.schedule = data;
      console.log(this.schedule);
      const a = document.getElementById('scheduleName');
      a.innerHTML = "";
      let h3N = document.createElement('h3');
      let pUN = document.createElement('p');
      let description = document.createElement('p');
      h3N.appendChild(document.createTextNode(`Schedule Name: ${this.schedule[0].name}`));
      pUN.appendChild(document.createTextNode(`Created by: ${this.schedule[0].username}`));
      description.appendChild(document.createTextNode(`Description: ${this.schedule[0].description}`));
      a.appendChild(h3N);
      a.appendChild(pUN);
      a.appendChild(description);
      console.log(this.schedule);
      const b = document.getElementById('schedule');
      b.innerHTML = "";
      let i = 1;
      this.schedule[0].courseList.forEach(e => {
          let h3s = document.createElement('h3');
          h3s.appendChild(document.createTextNode(`${i}. ${e.subject} ${e.catalog_nbr}`));
          b.appendChild(h3s);
          i++;
      });
    })
}
}
