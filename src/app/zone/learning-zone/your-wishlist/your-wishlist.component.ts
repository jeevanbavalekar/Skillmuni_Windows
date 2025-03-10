import { Component, HostListener } from '@angular/core';
import { Location } from '@angular/common';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-your-wishlist',
  templateUrl: './your-wishlist.component.html',
  styleUrls: ['./your-wishlist.component.css']
})
export class YourWishlistComponent {
  userProfileImg = JSON.parse(localStorage.getItem('loggedInUser')!).picture;
  userName = JSON.parse(localStorage.getItem('loggedInUser')!).name;
  email = JSON.parse(localStorage.getItem('loggedInUser')!).email;

  isDropdownOpen = false;
  selectedInquiry: string = '';
  selectedInquiryLabel: string = '';
  isFormSubmitted = false;
  message: string = '';

  inquiries = [
    { label: 'Soft Skills', value: 'soft-skills', icon: 'chat', example: 'leadership, communication' },
    { label: 'Technical Skills', value: 'technical-skills', icon: 'computer', example: 'IT and Networking' },
    { label: 'English Language', value: 'english-language', icon: 'school', example: 'general English improvement' },
    { label: 'Competencies', value: 'competencies', icon: 'groups', example: 'problem-solving, teamwork' },
    { label: 'Spoke English', value: 'spoke-english', icon: 'record_voice_over', example: 'focus on verbal fluency' },
    { label: 'Industry', value: 'industry', icon: 'business', example: 'tailored to specific industries' },
    { label: 'Others', value: 'others', icon: 'help_outline', example: 'anything we did not list here' }
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
