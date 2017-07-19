import { AuthService } from './../auth.service';
import { BookService } from './../book.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(
    public bookService:BookService,
    public authService:AuthService
  ) { }

  ngOnInit() {
  }

  onRequestBook(book:any){
    this.bookService.requestBook(book).subscribe(data => {
      if(data.success){
        this.bookService.requests.push(data.request);
      }
    })
  }

}
