import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-link-connect',
  templateUrl: './link-connect.component.html',
  styleUrls: ['./link-connect.component.scss']
})
export class LinkConnectComponent {
  passcode: string = '';

  constructor(private router: Router) {}

  connectToLink(): void {
    // Implement logic to connect to an existing link based on the passcode
    // You can use the passcode to retrieve shopping list data from Firestore
    // For example:
    // this.router.navigate(['/shopping-list', this.passcode]);
  }

  generateLink(): void {
    // Implement logic to generate a new link with a custom passcode
    // You can use Firestore to create a new shopping list document with the custom passcode
    // For example:
    // this.router.navigate(['/shopping-list/new']);
  }
}
