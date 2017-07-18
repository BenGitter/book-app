import { AuthService } from './auth.service';
import { Http, Headers } from '@angular/http';
import { Injectable } from '@angular/core';

import 'rxjs/add/operator/map';

@Injectable()
export class BookService {

  books:Array<any> = [];

  constructor(
    private http:Http,
    private authService:AuthService
  ) {
    this.getAllBooks().subscribe(data => {
      console.log(data);
      if(data.success){
        this.books = data.books;
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

}
