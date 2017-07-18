import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'filterByEmail'})
export class FilterByEmailPipe implements PipeTransform{
  transform(books: Array<any>, email: string): Array<any> {
    return books.filter((book, i) => {
      return book.owner == email;
    });
  }
}
