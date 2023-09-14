export interface Item {
    id?: string; // Optional field for the Firestore document ID (auto-generated)
    name: string; // Name of the item
    storeId: string; // ID of the store to which the item belongs
    completed: boolean; // Indicates whether the item is completed or not
  }
  