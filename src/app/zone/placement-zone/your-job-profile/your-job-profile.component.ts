import { Component } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-your-job-profile',
  templateUrl: './your-job-profile.component.html',
  styleUrls: ['./your-job-profile.component.css']
})
export class YourJobProfileComponent {
  title: string = 'your job profile';
  name = JSON.parse(localStorage.getItem('loggedInUser')!).given_name;
  userProfileImg = JSON.parse(localStorage.getItem('loggedInUser')!).picture;

  constructor(private location: Location) { }

  onBackClick() {
    this.location.back();
  }

}
