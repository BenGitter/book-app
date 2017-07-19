import { Router } from '@angular/router';
import { BookService } from './../book.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css']
})
export class AddBookComponent implements OnInit {

  title:string = "";
  searchResults:Array<Object> = [];

  selectedBook:any = null;

  constructor(
    private bookService:BookService,
    private router:Router
  ) { }

  ngOnInit() {
  }

  onAddBook(){
    this.bookService.addBook(this.selectedBook).subscribe(data => {
      if(data.success){
        this.bookService.books.push(data.book);
        this.router.navigate(["/my-books"]);
      }
    });
  }

  onSearchChange(){
    this.bookService.getSearchResults(this.title).subscribe(data => {
      this.searchResults = data.items;
    })
  }

  selectBook(book){
    this.selectedBook = book;
  }
}
