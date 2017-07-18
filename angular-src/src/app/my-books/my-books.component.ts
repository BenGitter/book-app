import { AuthService } from './../auth.service';
import { BookService } from './../book.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-my-books',
  templateUrl: './my-books.component.html',
  styleUrls: ['./my-books.component.css']
})
export class MyBooksComponent implements OnInit {

  constructor(
    public bookService:BookService,
    public authService:AuthService
  ) { }

  ngOnInit() {
  }

}
