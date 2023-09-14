import { Component, Input, OnInit } from '@angular/core';
import { FirebaseService } from '../../../services/firebase.service';
import { Store } from '../../../models/store.model';

@Component({
  selector: 'app-store-list',
  templateUrl: './store-list.component.html',
  styleUrls: ['./store-list.component.scss']
})
export class StoreListComponent implements OnInit {

  @Input()
  shopListID: string = "";

  stores: Store[] = []; // Array to store the list of stores

  constructor(private firebaseService: FirebaseService) {}

  ngOnInit(): void {
    this.loadStores(); // Call the function to load stores when the component is initialized
  }

  // Function to load the list of stores from Firestore
  loadStores(): void {
    this.firebaseService.getStores(this.shopListID).subscribe((stores: any) => {
      this.stores = stores;
    });
  }

  // You can add other methods for managing stores (e.g., delete, update) here

  // Example of a method to delete a store
  deleteStore(storeId: string): void {
    this.firebaseService.deleteStore(this.shopListID, storeId).then(() => {
      this.loadStores(); // Reload the list of stores after deleting
    });
  }
}
