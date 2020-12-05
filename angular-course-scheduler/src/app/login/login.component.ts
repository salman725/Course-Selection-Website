import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: String;
  password: String;

  result: String;

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
  }

  login(){

    let url = "http://localhost:3000/api/user/login"

    if (!this.email){
      alert('Please enter in an email');
    }

    if (!this.email.includes('@')){
      alert('Please enter in a valid email');
    }

    if (!this.password){
      alert('Please enter in a password');
    }

    this.http.post(url,{
      email: this.email,
      password: this.password
    }).toPromise().then((data: any) => {
      //console.log(data.json);
      this.result = JSON.stringify(data.any);
      if(data.any == "Login successful!"){
        this.router.navigate(['user', data.token]);
      }
      if(data.any == "Welcome admin!"){
        this.router.navigate(['admin', data.token]);
      }
      alert(this.result);
    })
  }

  changePassword (){
    this.router.navigate(['password-change'])
  }

}
