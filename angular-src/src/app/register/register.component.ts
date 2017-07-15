import { Component, OnInit } from '@angular/core';

import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  email:string = "";
  password:string = "";

  constructor(private authService:AuthService) { }

  ngOnInit() {
  }

  onRegister(){
    this.authService.register(this.email, this.password).subscribe(data => {
      console.log(data);
      // if(data.success){
      //   localStorage.setItem("token", data.token);
      // }else{
      //   console.log(data);
      // }
    });
  }

}
