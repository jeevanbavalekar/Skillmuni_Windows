import { Component, HostListener } from '@angular/core';
import { Location } from '@angular/common';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-entrepreneur-registration',
  templateUrl: './entrepreneur-registration.component.html',
  styleUrls: ['./entrepreneur-registration.component.css']
})
export class EntrepreneurRegistrationComponent {
  userProfileImg = JSON.parse(localStorage.getItem('loggedInUser')!).picture;
  userName = JSON.parse(localStorage.getItem('loggedInUser')!).name;
  email = JSON.parse(localStorage.getItem('loggedInUser')!).email;
  isFormSubmitted = false;
  message: string = '';

  constructor(private location: Location) { }


  submitForm(form: NgForm) {
    this.isFormSubmitted = true;
    if (form.invalid) {
      console.log('Form is invalid. Please fill all required fields.');
      return;
    }
    console.log('Form submitted with inquiry message:', this.message);
    this.isFormSubmitted = true;
  }

  onBackClick() {
    this.location.back();
  }
}
