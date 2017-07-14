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
}
