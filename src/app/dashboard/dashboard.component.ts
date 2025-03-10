import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  userProfileImg = '';
  name = '';

  constructor() {
    try {
      const userData = JSON.parse(localStorage.getItem('loggedInUser') || '{}');
      this.userProfileImg = userData.picture || '';
      this.name = userData.name || 'Saakshi Shetty'; // Default name if not found
    } catch (error) {
      console.error('Error parsing user data:', error);
      this.name = 'Saakshi Shetty'; // Fallback name
    }
  }

  ngOnInit(): void {
    // You can add initialization logic here
  }

  getInitials(): string {
    if (!this.name) return 'S';

    const nameParts = this.name.split(' ');
    if (nameParts.length > 1) {
      return (nameParts[0][0] + nameParts[1][0]).toUpperCase();
    }
    return nameParts[0][0].toUpperCase();
  }
}