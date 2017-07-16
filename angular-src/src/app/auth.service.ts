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

  loggedIn(){
    return tokenNotExpired();
  }
}
