import { Component, Input, OnInit } from '@angular/core';
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

  items: Item[] = []; // Array to store the list of items

  constructor(private firebaseService: FirebaseService) {}

  ngOnInit(): void {
    this.loadItems(); // Call the function to load items when the component is initialized
  }

  // Function to load the list of items from Firestore
  loadItems(): void {
    this.firebaseService.getItems(this.shopListID, this.storeID).subscribe((items) => {
      this.items = items;
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
    console.log(item);

    // Toggle the completion status
    //item.completed = !item.completed;
    console.log(item);

    // Update the item in Firebase
    this.firebaseService.updateItemStatus(this.shopListID, this.storeID, item);
  }
}
