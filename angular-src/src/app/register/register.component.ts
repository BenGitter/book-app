import { Router } from '@angular/router';
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

  constructor(
    private authService:AuthService,
    private router:Router
  ) { }

  ngOnInit() {
  }

  onRegister(){
    this.authService.register(this.email, this.password).subscribe(data => {
      if(data.success){
        this.router.navigate(["/login"]);
      }else{
        console.log("error:", data.error);
      }
    });
  }

}
