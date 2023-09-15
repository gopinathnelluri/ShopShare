import { Component, Input } from '@angular/core';
import { Item } from 'src/app/models/item.model';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.scss']
})
export class AddItemComponent {
  @Input()
  shopListID: string = "";

  @Input()
  storeName: string = "";

  @Input()
  storeID: string = "";
  
  newItem: Item = { name: '', storeId: this.storeID, completed: false }; // Initialize a new item object

  constructor(private firebaseService: FirebaseService) {}

  // Function to add a new item to Firestore
  addItem(): void {
    if (this.newItem.name) {
      if(!this.newItem.storeId){
        this.newItem.storeId = this.storeID;
      }
      
      this.firebaseService.addItem(this.shopListID, this.storeName, this.newItem).then((data) => {
        // Clear the form and provide feedback (e.g., show a success message)
        if(data.id){
          this.newItem = { name: '', storeId: this.storeID, completed: false };
        } else {
          alert("failed to add item");
        }
        
      });
    }
  }
}
