import { Component, ViewChild } from '@angular/core';
import { map } from '@firebase/util';
import { IonModal } from '@ionic/angular';
import { AvatarService } from '../service/avatar.service';
import { Item } from '../shared/models';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
})
export class Tab3Page {
  isOpen = false;
  items = [];
  selectedItem;
  selectedCategory = 'All';
  categories = [];
  itemsDuplicate = [];

  constructor(private avatarService: AvatarService) {
    this.loadCategories();
    this.loadItems();
  }

  search(event) {
    const searchValue = event.target.value;
    if (searchValue.length < 0) {
      this.items = this.itemsDuplicate;
    } else {
      this.items = this.itemsDuplicate.filter((item) => item.description.toLowerCase().indexOf(searchValue.toLowerCase()) !== -1);
    }
    console.log(this.items);
  }

  loadCategories() {
    this.avatarService.getCategories().subscribe((categories) => {
      this.categories = categories;
      this.categories.unshift({ categoryId: '', description: 'All' });
    });
  }

  loadItems() {
    this.avatarService
      .getItems()
      .subscribe(
        (items) => {
          this.items = items.sort((a, b) =>
            a.availability < b.availability
              ? -1
              : a.availability > b.availability
              ? 1
              : 0
          ) as Item[];
          this.itemsDuplicate = this.items;
        }
      );
  }

  cancel() {
    this.isOpen = false;
    this.loadItems();
  }

  openEditModal(item) {
    this.isOpen = true;
    this.selectedItem = item;
    console.log(item);
  }
}
