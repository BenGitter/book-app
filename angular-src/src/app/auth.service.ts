import { tokenNotExpired } from 'angular2-jwt';
import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

import 'rxjs/add/operator/map';

@Injectable()
export class AuthService {

  constructor(private http:Http) { }


  login(email:string, password:string){
    let headers = new Headers();
    headers.append("Content-Type", "application/json");

    const body = {
      email,
      password
    };

    return this.http.post("/auth/login", body, {headers})
      .map(res => res.json());
  }

  register(email:string, password:string){
    let headers = new Headers();
    headers.append("Content-Type", "application/json");

    const body = {
      email,
      password
    };

    return this.http.post("/auth/register", body, {headers})
      .map(res => res.json());
  }

  logout(){
    localStorage.removeItem("token");
  }

  loggedIn(){
    if(tokenNotExpired()){
      return true;
    }else{
      localStorage.removeItem("token");
      return false;
    }
  }

  getToken(){
    if(this.loggedIn()){
      return localStorage.getItem("token");
    }else{
      return "";
    }
  }

}
