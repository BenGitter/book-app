import { AuthService } from './auth.service';
import { Http, Headers } from '@angular/http';
import { Injectable } from '@angular/core';

import 'rxjs/add/operator/map';

@Injectable()
export class BookService {

  books:Array<any> = [];
  requests:Array<any> = [];

  constructor(
    private http:Http,
    private authService:AuthService
  ) {
    // Get all books
    this.getAllBooks().subscribe(data => {
      if(data.success){
        this.books = data.books;
      }
    });

    // Get all requests
    this.getAllRequests().subscribe(data => {
      if(data.success){
        this.requests = data.requests;
      }
    });

  }

  getSearchResults(search:string){
    let headers = new Headers();
    headers.append("Content-Type", "application/json");

    return this.http.get("https://www.googleapis.com/books/v1/volumes?maxResults=10&q="+search, {headers: headers}).map(res => res.json());
  }

  addBook(book:any){
    const token = this.authService.getToken();

    let headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Authorization", "JWT "+token);

    const body = {
      title: book.volumeInfo.title,
      authors: book.volumeInfo.authors,
      thumbnail: book.volumeInfo.imageLinks.smallThumbnail
    };

    return this.http.post("/api/book", body, {headers: headers})
      .map(res => res.json());
  }

  getAllBooks(){
    let headers = new Headers();
    headers.append("Content-Type", "application/json");

    return this.http.get("/api/books", {headers: headers})
      .map(res => res.json());
  }

  requestBook(book:any){
    const token = this.authService.getToken();

    let headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Authorization", "JWT "+token);

    return this.http.post("/api/request", book, {headers: headers})
      .map(res => res.json());
  }

  getAllRequests(){
    let headers = new Headers();
    headers.append("Content-Type", "application/json");

    return this.http.get("/api/requests", {headers: headers})
      .map(res => res.json());
  }

  isRequested(book){
    const match = this.requests.find((request, i) => {
      return (request.title == book.title && request.requestedBy == this.authService.getEmail());
    });

    return match ? true : false;
  }

  removeRequest(id:string){
    const token = this.authService.getToken();

    let headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Authorization", "JWT "+token);

    return this.http.delete("/api/request/"+id, {headers: headers})
      .map(res => res.json());
  }

  acceptRequest(id:string){
    const token = this.authService.getToken();
    console.log(token);
    let headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Authorization", "JWT "+token);

    return this.http.put("/api/request/"+id, {}, {headers: headers})
      .map(res => res.json());
  }

}
