import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'filterBy'})
export class FilterByPipe implements PipeTransform{
  transform(arr: Array<any>, prop: string, email: string): Array<any> {
    return arr.filter((item, i) => {
      return item[prop] == email;
    });
  }
}
