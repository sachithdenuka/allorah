import { Pipe, PipeTransform } from '@angular/core';
import { Item } from '../shared/models';

@Pipe({
  name: 'categoryFilter',
})
export class CategoryFilterPipe implements PipeTransform {
  transform(items: any[], filter: string): any[] {
    if (!items || !filter || filter === 'All') {
      return items;
    }

    return items.filter((item) => item.category.indexOf(filter) !== -1);
  }
}
