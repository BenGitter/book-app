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
        this.router.navigate(["/my-books"]);
      }
    });
  }

  onSearchChange(){
    console.log(this.title);
    this.bookService.getSearchResults(this.title).subscribe(data => {
      console.log(data.items);
      this.searchResults = data.items;
      // volumeInfo.title / authors
    })
  }

  selectBook(book){
    this.selectedBook = book;
  }
}
