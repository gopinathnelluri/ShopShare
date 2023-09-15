import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Item } from 'src/app/models/item.model';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.scss']
})
export class ItemListComponent implements OnInit {


  @Input()
  shopListID: string = "";

  @Input()
  storeName: string = "";

  @Input()
  storeID: string = "";

  @Output() 
  totalPendingItemsEvent = new EventEmitter<any>();

  items: Item[] = []; // Array to store the list of items

  constructor(private firebaseService: FirebaseService) {}

  ngOnInit(): void {
    this.loadItems(); // Call the function to load items when the component is initialized
  }

  // Function to load the list of items from Firestore
  loadItems(): void {
    this.firebaseService.getItems(this.shopListID, this.storeID).subscribe((items) => {
      this.items = items;
      if(this.items && this.items.length > 0){
        let totalPendingItems = 0;
        this.items.forEach((tempItem) => {
          if(!tempItem.completed){
            totalPendingItems += 1;
          }
        });
        this.totalPendingItemsEvent.emit(totalPendingItems);
      }
    });
  }

  // You can add other methods for managing items (e.g., delete, update) here

  // Example of a method to delete an item
  deleteItem(itemId: string): void {
    this.firebaseService.deleteItem(this.shopListID, this.storeID, itemId).then(() => {
      this.loadItems(); // Reload the list of items after deleting
    });
  }

  toggleItemCompletion(item: Item): void {
    setTimeout(()=> {
      this.firebaseService.updateItemStatus(this.shopListID, this.storeID, item);
    }, 1000);
  }
}
