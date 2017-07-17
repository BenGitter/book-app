import { Http, Headers } from '@angular/http';
import { Injectable } from '@angular/core';

import 'rxjs/add/operator/map';

@Injectable()
export class BookService {

  constructor(
    private http:Http
  ) { }


  getSearchResults(search:string){
    let headers = new Headers();
    headers.append("Content-Type", "application/json");

    return this.http.get("https://www.googleapis.com/books/v1/volumes?maxResults=10&q="+search, {headers: headers}).map(res => res.json());
  }

  addBook(book:any){
    let headers = new Headers();
    headers.append("Content-Type", "application/json");

    return this.http.post("/api/book", book, {headers: headers}).map(res => res.json());
  }
}
