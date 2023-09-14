import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseService } from 'src/app/services/firebase.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-link-generation',
  templateUrl: './link-generation.component.html',
  styleUrls: ['./link-generation.component.scss']
})
export class LinkGenerationComponent {
  linkname: string = "";
  passcode: string = '';

  constructor(private router: Router, private firebaseService: FirebaseService, private localStorage: LocalStorageService) {}

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
    // Generate a new link with a custom passcode
    this.firebaseService
      .createNewLink(this.linkname, this.passcode)
      .then((status) => {
        // Redirect to the newly generated shopping list
        if(status){
          this.localStorage.setObject("activeLink", {linkname: this.linkname, passcode: this.passcode});
          this.router.navigate(['/shopping-list', this.linkname]);
        }
      })
      .catch((error) => {
        console.error('Error generating link:', error);
      });
  }
}
