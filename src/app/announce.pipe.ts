import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'announce'
})
export class AnnouncePipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
