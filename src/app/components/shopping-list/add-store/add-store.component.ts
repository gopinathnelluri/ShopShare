import { Component, Input, OnInit } from '@angular/core';
import { Store } from 'src/app/models/store.model';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-add-store',
  templateUrl: './add-store.component.html',
  styleUrls: ['./add-store.component.scss']
})
export class AddStoreComponent implements OnInit {
  @Input()
  shopListID: string = "";

  newStore: Store = { name: '' }; // Initialize a new store object

  constructor(private firebaseService: FirebaseService) {}
  
  ngOnInit(): void {
    // throw new Error('Method not implemented.');
  }

  // Function to add a new store to Firestore
  addStore(): void {
    if (this.newStore.name) {
      this.firebaseService.addStore(this.shopListID, this.newStore).then((status) => {
        // Clear the form and provide feedback (e.g., show a success message)
        if(status){
          this.newStore = { name: ''};
        } else {
          alert ("store already exists")
        }
        
      });
    }
  }
}
