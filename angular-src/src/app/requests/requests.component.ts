import { AuthService } from './../auth.service';
import { BookService } from './../book.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.css']
})
export class RequestsComponent implements OnInit {

  constructor(
    public bookService:BookService,
    public authService:AuthService
  ) { }

  ngOnInit() {
  }

  onRemoveRequest(request:any){
    this.bookService.removeRequest(request._id).subscribe(data => {
      if(data.success){
        this.bookService.requests = this.bookService.requests.filter((val, i) => {
          return request._id != val._id;
        });
      }
    })
  }

  onAcceptRequest(request:any){
    this.bookService.acceptRequest(request._id).subscribe(data => {
      if(data.success){
        // Remove request from service
        this.bookService.requests = this.bookService.requests.filter((val, i) => {
          return request._id != val._id;
        });

        // Change book 
        for(let i = 0; i < this.bookService.books.length; i++){
          if(this.bookService.books[i].title == request.title){
            this.bookService.books[i].owner = request.requestedBy;
            break;
          }
        }
      }
    });
  }

}
