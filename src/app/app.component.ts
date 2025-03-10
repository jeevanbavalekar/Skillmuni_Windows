import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, Event, NavigationStart, NavigationCancel, NavigationError } from '@angular/router';
import { LoaderService } from './services/loader.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  showHeaderFooter = true;

  constructor(private router: Router, private loaderService: LoaderService) { }

  ngOnInit(): void {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationStart) {
        this.loaderService.show();
      } else if (event instanceof NavigationEnd) {
        this.loaderService.hide();
        this.showHeaderFooter = this.shouldShowHeader(event.urlAfterRedirects);
      } else if (event instanceof NavigationCancel || event instanceof NavigationError) {
        this.loaderService.hide();
      }
    });

    this.showHeaderFooter = this.shouldShowHeader(this.router.url);
  }

  private shouldShowHeader(url: string): boolean {
    return !url.startsWith('/login');
  }
}
