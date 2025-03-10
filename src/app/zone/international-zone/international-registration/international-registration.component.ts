import { Component, HostListener } from '@angular/core';
import { Location } from '@angular/common';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-international-registration',
  templateUrl: './international-registration.component.html',
  styleUrls: ['./international-registration.component.css']
})
export class InternationalRegistrationComponent {
  userProfileImg = JSON.parse(localStorage.getItem('loggedInUser')!).picture;
  userName = JSON.parse(localStorage.getItem('loggedInUser')!).name;
  email = JSON.parse(localStorage.getItem('loggedInUser')!).email;

  isDropdownOpen = false;
  selectedInquiry: string = '';
  selectedInquiryLabel: string = '';
  isFormSubmitted = false;
  message: string = '';

  inquiries = [
    { label: 'Study Abroad', value: 'study' },
    { label: 'Immigration', value: 'immigration' },
    { label: 'Visitor Visa', value: 'visitor' },
    { label: 'Business Immigration', value: 'business' }
  ];

  constructor(private location: Location) { }

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  selectInquiry(option: any, event: Event) {
    event.stopPropagation(); // Prevents unwanted event bubbling
    this.selectedInquiry = option.value;
    this.selectedInquiryLabel = option.label;
    this.isDropdownOpen = false; // Close dropdown after selection
  }

  @HostListener('document:click', ['$event'])
  closeDropdown(event: Event) {
    const target = event.target as HTMLElement;
    if (!target.closest('.custom-dropdown')) {
      this.isDropdownOpen = false; // Close dropdown when clicking outside
    }
  }

  submitForm(form: NgForm) {
    this.isFormSubmitted = true;

    if (!this.selectedInquiry) {
      console.log('Inquiry is required.');
      return;
    }

    if (form.invalid) {
      console.log('Form is invalid. Please fill all required fields.');
      return;
    }

    console.log('Form submitted with inquiry:', this.selectedInquiry, 'and message:', this.message);
    this.isFormSubmitted = true;
  }

  onBackClick() {
    this.location.back();
  }
}
