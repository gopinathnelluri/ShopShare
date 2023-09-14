import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StoreListComponent } from './components/shopping-list/store-list/store-list.component';
import { ItemListComponent } from './components/shopping-list/store-list/item-list/item-list.component';
import { AddStoreComponent } from './components/shopping-list/add-store/add-store.component';
import { AddItemComponent } from './components/shopping-list/store-list/add-item/add-item.component';
import { LinkGenerationComponent } from './components/link-generation/link-generation.component';
import { LinkConnectComponent } from './components/link-connect/link-connect.component';
import { ShoppingListComponent } from './components/shopping-list/shopping-list.component';

const routes: Routes = [
  { path: '', redirectTo: '/shopshare-create', pathMatch: 'full' }, // Redirect to the store list
  { path: 'shopshare-create', component: LinkGenerationComponent }, // Route for the Create new ShopShare Link
  { path: 'shopshare-connect', component: LinkConnectComponent }, // Route for the Connect to existing ShopShare Link
  { path: 'shopping-list/:id', component: ShoppingListComponent }, // Route for the store list
  { path: 'stores', component: StoreListComponent }, // Route for the store list
  { path: 'items', component: ItemListComponent }, // Route for the item list
  { path: 'add-store', component: AddStoreComponent }, // Route for adding a store
  { path: 'add-item', component: AddItemComponent }, // Route for adding an item
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
