import { Injectable } from '@angular/core';
import { AngularFireMessaging } from '@angular/fire/compat/messaging';

@Injectable({
  providedIn: 'root'
})
export class MessagingService {

  constructor(private angularFireMessaging: AngularFireMessaging) {}

  requestPermission(): void {
    this.angularFireMessaging.requestToken.subscribe(
      (token) => {
        // Send the token to your server for further use
      },
      (error) => {
        console.error(error);
      }
    );
  }

  receiveMessages(): void {
    this.angularFireMessaging.messages.subscribe(
      (message) => {
        // Handle incoming messages (e.g., show notifications)
      },
      (error) => {
        console.error(error);
      }
    );
  }
}
