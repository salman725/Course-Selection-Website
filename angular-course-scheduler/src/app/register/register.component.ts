import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { User } from '../User';

export class Users {
  constructor(
    public name: string,
    public username: string,
    public password: string
  ) {
  }
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {

  name: String;
  email: String;
  password: String;

  result: String;
  
  url = "http://localhost:3000/api/user/register"

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
  }

  register(){

    let url = "http://localhost:3000/api/user/register"

    if(!this.name){
      alert('Please enter in a name');
    }

    if (this.password.length < 6) {
      alert('Please enter 6 or more characters for the password');
    }

    this.http.post(url,{
      name: this.name,
      email: this.email,
      password: this.password
    }).toPromise().then((data: any) => {
      console.log(data.json);
      this.result = JSON.stringify(data);
      alert(this.result);
    })
  }
}
