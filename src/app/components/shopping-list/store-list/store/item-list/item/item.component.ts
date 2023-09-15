import { Component, Input } from '@angular/core';
import { Item } from 'src/app/models/item.model';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent {

  @Input()
  item: Item | undefined;

  @Input()
  shopListID: string = "";

  @Input()
  storeName: string = "";

  @Input()
  storeID: string = "";

  constructor(private firebaseService: FirebaseService) {}

  toggleItemCompletion(item: Item): void {
    setTimeout(()=> {
      this.firebaseService.updateItemStatus(this.shopListID, this.storeID, item);
    }, 1000);
  }

}
