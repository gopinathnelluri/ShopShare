import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, DocumentData, DocumentReference } from '@angular/fire/compat/firestore/'; 
import { Store } from '../models/store.model';
import { Item } from '../models/item.model';
import { Observable, map } from 'rxjs';

enum Keys{
  shoppinglist = "shoppinglist",
  stores = "stores",
  items = "items"
}

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  
  private storesCollection: AngularFirestoreCollection<Store>;
  private stores: Observable<Store[]>;

  private itemsCollection: AngularFirestoreCollection<Item>;
  private items: Observable<Item[]>;


  constructor(private firestore: AngularFirestore) {
    this.storesCollection = this.firestore.collection<Store>('stores');
    this.stores = this.storesCollection.valueChanges();

    this.itemsCollection = this.firestore.collection<Item>('items');
    this.items = this.itemsCollection.valueChanges();
  }

  createNewLink(linkName: string, customPasscode: string): Promise<boolean> {
    // Generate a new link with a custom passcode
    const newLink = { linkname: linkName, passcode: customPasscode }; // You can add other data as needed
    return new Promise<boolean>((resolve, reject) => {
      // Define the document reference with the custom passcode as the ID
      const linkDocRef = this.firestore.collection(Keys.shoppinglist).doc(linkName);
      linkDocRef
        .get()
        .toPromise()
        .then((docSnapshot) => {
          if (!docSnapshot?.exists) {
            // The document with the custom passcode does not exist, so create it
            linkDocRef
              .set(newLink)
              .then((doc: any) => {
                console.log("check", doc)
                resolve(true);
              })
              .catch((error) => {
                reject(error);
              });
          } else {
            // The document with the custom passcode already exists
            reject(new Error('Shopping List with the given name already exists.'));
          }
        })
        .catch((error) => {
          reject(error);
        });
    });   
  }

  updateItemStatus(shopListID: string, storeID: string, item: Item): Promise<void> {
    console.log(shopListID, storeID, item);
    return this.firestore.collection(Keys.shoppinglist).doc(shopListID)
      .collection(Keys.stores).doc(storeID).collection<Item>(Keys.items).doc(item.id).update(item);
  }

  // Get a list of stores from Firestore
  getStores(linkName: string): Observable<Store[]> {
    return this.firestore.collection(Keys.shoppinglist).doc(linkName).collection(Keys.stores).snapshotChanges().pipe(
      map(actions => {
        return actions.map(action => {
          const data = action.payload.doc.data() as any; // Use 'as any' or define an interface for your document structure
          const id = action.payload.doc.id;
          return { id, ...data };
        });
      })
    );
  }

  // Delete a store from Firestore by its ID
  deleteStore(shopListID: string, storeId: string): Promise<void> {
    const storeDoc = this.firestore.collection(Keys.shoppinglist).doc(shopListID).collection(Keys.stores).doc(storeId);
    storeDoc.collection(Keys.items).get().subscribe((querySnapshot) => {
      querySnapshot.forEach(doc => {
        console.log(doc);
        doc.ref.delete();
      });
    });
    return storeDoc.delete();
  }

  // Add store to Firestore
  addStore(linkName: string, storeData: Store): Promise<any> {
    const storeId = this.formatStoreID(storeData.name);
    
    return new Promise<boolean>((resolve, reject) => {
      // Define the document reference with the custom passcode as the ID
      const storeDoc = this.firestore.collection(Keys.shoppinglist).doc(linkName).collection(Keys.stores).doc(storeId);
      storeDoc
        .get()
        .toPromise()
        .then((docSnapshot) => {
          if (!docSnapshot?.exists) {
            // The document with the custom passcode does not exist, so create it
            storeDoc
              .set(storeData)
              .then((doc: any) => {
                resolve(true);
              })
              .catch((error) => {
                reject(error);
              });
          } else {
            // The document with the custom passcode already exists
            reject(new Error('Store with the given name already exists.'));
          }
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  // Get a list of items from Firestore
  getItems(shopListID: string, storeID: string): Observable<Item[]> {
    const storeId = this.formatStoreID(storeID);
    
    return this.firestore.collection(Keys.shoppinglist).doc(shopListID)
    .collection(Keys.stores).doc(storeId).collection(Keys.items).snapshotChanges().pipe(
      map(actions => {
        return actions.map(action => {
          const data = action.payload.doc.data() as any; // Use 'as any' or define an interface for your document structure
          const id = action.payload.doc.id;
          return { id, ...data };
        });
      })
    );
  }
  
  // Delete an item from Firestore by its ID
  deleteItem(shopListID: string, storeID: string, itemId: string): Promise<void> {
    const itemDoc = this.firestore.collection(Keys.shoppinglist).doc(shopListID)
    .collection(Keys.stores).doc(storeID).collection(Keys.items).doc(itemId);
    return itemDoc.delete();
  }

  // Add item to Firestore
  addItem(shopListID: string, storeName: string, itemData: Item): Promise<any> {
    const storeId = this.formatStoreID(storeName);
    return this.firestore.collection(Keys.shoppinglist).doc(shopListID)
    .collection(Keys.stores).doc(storeId).collection('items').add(itemData);
  }

  // Update item in Firestore
  updateItem(itemId: string, updates: Partial<Item>): Promise<void> {
    return this.firestore.collection('items').doc(itemId).update(updates);
  }

  // Delete checked items in Firestore
  deleteCheckedItems(storeId: string): Promise<void> {
    return this.firestore
      .collection('items', (ref) => ref.where('storeId', '==', storeId).where('completed', '==', true))
      .get()
      .toPromise()
      .then((querySnapshot) => {
        const batch = this.firestore.firestore.batch();
        if(querySnapshot){
          querySnapshot.forEach((doc) => {
            batch.delete(doc.ref);
          });
        }
        
        return batch.commit();
      });
  }

  formatStoreID(storeName: string){
    return storeName.toLowerCase().replaceAll(" ","_");
  }
}
