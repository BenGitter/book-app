import { Component, OnInit } from '@angular/core';

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
      }else{
        console.log(data);
      }
    });
  }
}
