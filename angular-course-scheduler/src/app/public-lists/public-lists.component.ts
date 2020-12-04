import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-public-lists',
  templateUrl: './public-lists.component.html',
  styleUrls: ['./public-lists.component.css']
})
export class PublicListsComponent implements OnInit {

  list:[ 
  {
    visibility: String,
    _id: String,
    name: String,
    username: String,
    description: String,
    courseList: [subject: String, ],
    date: String,
  }];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.showLists()
  }

  showLists(){

    let url = "http://localhost:3000/api/schedule/";

    this.http.get(url)
    .toPromise().then((data: any) => {
      this.list = data;
      console.log(this.list);
      const a = document.getElementById('lists');
      a.innerHTML = "";
      let c = 0;
      this.list.forEach(e => {
        if (c > 9){
          
        }
        let h3N = document.createElement('h3');
        let pUN = document.createElement('p');
        let description = document.createElement('p');
        h3N.appendChild(document.createTextNode(`Schedule Name: ${this.list[c].name}`));
        pUN.appendChild(document.createTextNode(`Created by: ${this.list[c].username}`));
        description.appendChild(document.createTextNode(`Description: ${this.list[c].description}`));
        a.appendChild(h3N);
        a.appendChild(pUN);
        a.appendChild(description);
        let i = 0;
            this.list[c].courseList.forEach(b => {
            let h4s = document.createElement('h4');
            h4s.appendChild(document.createTextNode(`${i + 1}. ${b.subject} ${b.catalog_nbr}`));
            a.appendChild(h4s);
            i++;
      });
        c++;
      })
      
      /*const b = document.getElementById('schedule');
      b.innerHTML = "";
      let i = 1;
      this.list[0].courseList.forEach(e => {
          let h3s = document.createElement('h3');
          h3s.appendChild(document.createTextNode(`${i}. ${e.subject} ${e.catalog_nbr}`));
          b.appendChild(h3s);
          i++;
      });
*/
  })
  }
}
