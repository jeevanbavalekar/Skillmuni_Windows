import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ZoneService } from 'src/app/services/zone.service';
import { Location } from '@angular/common';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
@Component({
  selector: 'app-skill-zone',
  templateUrl: './skill-zone.component.html',
  styleUrls: ['./skill-zone.component.css']
})
export class SkillZoneComponent implements OnInit {
  skillZoneCards: any[] = [];
  showAd: boolean = true;
  isMobileView: boolean = false; 
  constructor(private router: Router, private zoneService: ZoneService,private location: Location, private breakpointObserver: BreakpointObserver) { }

  ngOnInit(): void {
    this.fetchSkillZoneCards();
      // Observe screen size
      this.breakpointObserver.observe([Breakpoints.Handset]).subscribe(result => {
        this.isMobileView = result.matches;
      });
  }

  fetchSkillZoneCards() {
    this.zoneService.getSkillZoneCards().subscribe(
      (data: any[]) => {
        this.skillZoneCards = data
          .filter(item => item.status === "A") // Only active items
          .map(item => ({
            id_academic_tile: item.id_academic_tile,
            title: item.tile_name,
            image: item.tile_image,
            solved: '1111/9999',
            credits: '99'
          }));
      },
      error => {
        console.error('Error fetching skill zone cards:', error);
      }
    );
  }

  navigateToCategory(card: any) {
    this.router.navigate(['/skill-zone-category', card.id_academic_tile, encodeURIComponent(card.title)]);
  }

  hideAd() {
    this.showAd = false; // Hides the ad on click
  }
  onBackClick() {
    this.location.back();
  }
}
