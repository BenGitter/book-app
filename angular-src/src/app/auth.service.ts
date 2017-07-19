import { tokenNotExpired, JwtHelper } from 'angular2-jwt';
import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

import 'rxjs/add/operator/map';

@Injectable()
export class AuthService {

  jwtHelper: JwtHelper = new JwtHelper();

  constructor(private http:Http) { }

  saveProfile(profile:any){
    const token = this.getToken();

    let headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Authorization", "JWT "+token);

    return this.http.post("/auth/profile", profile, {headers: headers})
      .map(res => res.json());
  }

  getProfile(){
    const token = this.getToken();

    let headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Authorization", "JWT "+token);

    return this.http.get("/auth/profile", {headers: headers})
      .map(res => res.json());
  }

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

  getEmail(){
    return this.jwtHelper.decodeToken(this.getToken()).email;
  }

}
