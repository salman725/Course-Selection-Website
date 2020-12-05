import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { LoginComponent } from './login/login.component'

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor (private _loginComponent: LoginComponent,
                private _router: Router){ }

  canActivate(): boolean {
    if(this._loginComponent.loggedIn()){
      return true
    }else{
      this._router.navigate(['/login'])
      return false
    }
  }
}
