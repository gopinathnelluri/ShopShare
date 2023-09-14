import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { ServiceWorkerModule } from '@angular/service-worker';
import { StoreListComponent } from './components/shopping-list/store-list/store-list.component';
import { ItemListComponent } from './components/shopping-list/store-list/item-list/item-list.component';
import { AddStoreComponent } from './components/shopping-list/add-store/add-store.component';
import { AddItemComponent } from './components/shopping-list/store-list/add-item/add-item.component';
import { FormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireMessagingModule } from '@angular/fire/compat/messaging';
import { LinkGenerationComponent } from './components/link-generation/link-generation.component';
import { LinkConnectComponent } from './components/link-connect/link-connect.component';
import { ShoppingListComponent } from './components/shopping-list/shopping-list.component';
//import { environment } from '../environments/environment';

const firebaseConfig = {
  apiKey: "AIzaSyA1FTY_qBVieKNksC1_Txb7Acf9Phe6Hqo",
  authDomain: "shopshare-app.firebaseapp.com",
  projectId: "shopshare-app",
  storageBucket: "shopshare-app.appspot.com",
  messagingSenderId: "4105685075",
  appId: "1:4105685075:web:3fb9408e39544d8b079ea6",
  measurementId: "G-NYKTBEQHFT"
};

@NgModule({
  declarations: [
    AppComponent,
    StoreListComponent,
    ItemListComponent,
    AddStoreComponent,
    AddItemComponent,
    LinkGenerationComponent,
    LinkConnectComponent,
    ShoppingListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: false /*environment.production*/ }),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule,
    AngularFireMessagingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
