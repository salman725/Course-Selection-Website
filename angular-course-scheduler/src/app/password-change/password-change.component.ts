import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-password-change',
  templateUrl: './password-change.component.html',
  styleUrls: ['./password-change.component.css']
})

export class PasswordChangeComponent implements OnInit {

  email: String;
  oldpassword: String;
  newpassword: String;

  result: String;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }

  change(){

    let url = "http://localhost:3000/api/user/login"

    this.http.patch(url,{
      email: this.email,
      oldpassword: this.oldpassword,
      newpassword: this.newpassword
    }).toPromise().then((data: any) => {
      //console.log(data.json);
      this.result = JSON.stringify(data.any);
      alert(this.result);
    })
  }    
}

