import { Component, Input } from '@angular/core';
import { Store } from 'src/app/models/store.model';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.scss']
})
export class StoreComponent {

  @Input()
  store: Store | undefined;

  @Input()
  shopListID: string = "";

  pendingItemsCount = 0;

  constructor(private firebaseService: FirebaseService) {}


  totalPendingItems(event: any){
    this.pendingItemsCount = event;
  }

  // Method to delete a store
  deleteStore(storeId: string): void {
    this.firebaseService.deleteStore(this.shopListID, storeId).then(() => {
      // this.loadStores(); // Reload the list of stores after deleting
    });
  }

  // Method to cleare completed items in a store
  clearCompletedItem(storeId: string): void {
    this.firebaseService.clearCompletedItem(this.shopListID, storeId).then(() => {
      // this.loadStores(); // Reload the list of stores after deleting
    });
  }

}
