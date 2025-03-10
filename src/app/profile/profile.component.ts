import { Component } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {

  userProfileImg = JSON.parse(localStorage.getItem('loggedInUser')!).picture;
  name = JSON.parse(localStorage.getItem('loggedInUser')!).name;
  email = JSON.parse(localStorage.getItem('loggedInUser')!).email;


  userProfile = {
    // name: "Saakshi Shetty",
    // email: "saakshi@gmail.com",
    phone: "",
    dateOfBirth: "",
    gender: "",
    country: "",
    state: "",
    city: "",
    userType: "",
    collegeCountry: "",
    collegeState: "",
    collegeCity: "",
    college: "",
    degree: "",
    stream: "",
    graduationYear: "",
    referralCode: "",
    partOf: "",
  }

  constructor(private location: Location,) { }

  ngOnInit(): void {
    // Initialize component
  }

  onBackClick() {
    this.location.back();
  }

  saveProfile(): void {
    // Save profile logic
    console.log("Saving profile:", this.userProfile)
    // Here you would typically make an API call to save the profile data
  }

  verifyReferralCode(): void {
    // Verify referral code logic
    console.log("Verifying referral code:", this.userProfile.referralCode)
    // Here you would typically make an API call to verify the referral code
  }

  editProfile(): void {
    // Edit profile logic
    console.log("Editing profile")
    // Here you would typically navigate to an edit profile page or show a modal
  }
}
