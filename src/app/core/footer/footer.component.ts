import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {
  activeLink: string = 'home';

  constructor(private router: Router) {
    // Subscribe to router events to update active link dynamically
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        const currentRoute = event.urlAfterRedirects.split('/')[1] || 'home';

        // Keep 'home' active unless navigating to 'leaderboard' or 'dashboard'
        if (currentRoute === 'leaderboard' || currentRoute === 'dashboard') {
          this.activeLink = currentRoute;
        } else {
          this.activeLink = 'home';
        }
      }
    });
  }

  setActiveLink(link: string) {
    if (link === 'leaderboard' || link === 'dashboard') {
      this.activeLink = link;
    } else {
      this.activeLink = 'home';
    }
    this.router.navigate([`/${link}`]); // Navigate to the selected route
  }
}
