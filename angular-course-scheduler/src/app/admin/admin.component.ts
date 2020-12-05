import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  email: String;
  status: String;
  priviliges: String;

  result: String;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }

  change(){
    let url = "http://localhost:3000/api/user/admin"

    this.http.patch(url,{
      email: this.email,
      status: this.status,
      priviliges: this.priviliges
    }).toPromise().then((data: any) => {
      //console.log(data.json);
      this.result = JSON.stringify(data.any);
      alert(this.result);
    })

  }

}
