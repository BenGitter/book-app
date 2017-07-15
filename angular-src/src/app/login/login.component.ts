import { Component, OnInit } from '@angular/core';

import { tokenNotExpired } from 'angular2-jwt';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email:string = "";
  password:string = "";

  constructor(private authService:AuthService) { }

  ngOnInit() {
  }

  onLogin(){
    this.authService.login(this.email, this.password).subscribe(data => {
      if(data.success){
        localStorage.setItem("token", data.token);
        console.log(this.loggedIn());
      }
    });
  }

  loggedIn(){
    return tokenNotExpired();
  }

}
