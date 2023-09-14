import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  // Save data to localStorage
  setItem(key: string, value: any): void {
    localStorage.setItem(key, value);
  }

  // Save data to localStorage
  setObject(key: string, value: any): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  // Save data to localStorage
  setActiveShopList(value: any): void {
    localStorage.setItem("ActiveShopList", JSON.stringify(value));
  }

  // Retrieve data from localStorage
  getActiveShopList(): any {
    const item = localStorage.getItem("ActiveShopList");
    return item ? JSON.parse(item) : null;
  }

  // Clear data from localStorage
  removeActiveShopList(): void {
    localStorage.removeItem("ActiveShopList");
  }

  // Retrieve data from localStorage
  getItem(key: string): any {
    const item = localStorage.getItem(key);
    return item ? item : null;
  }

  // Retrieve data from localStorage
  getObject(key: string): any {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  }

  // Clear data from localStorage
  removeItem(key: string): void {
    localStorage.removeItem(key);
  }
}
