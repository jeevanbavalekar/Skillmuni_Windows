import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { ZoneService } from '../services/zone.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  zones: any[] = [];
  learningZoneCards: any[] = [];
  skillZoneCards: any[] = [];
  displayedCardsCount = 6;
  name = JSON.parse(localStorage.getItem('loggedInUser')!).given_name;
  userProfileImg = JSON.parse(localStorage.getItem('loggedInUser')!).picture;
 

  constructor(
    private router: Router,
    private zoneService: ZoneService,
    private breakpointObserver: BreakpointObserver
  ) { }

  ngOnInit(): void {
    this.zones = this.zoneService.getZones();
    this.fetchLearningZoneCards();
    this.fetchSkillZoneCards();

    // Observe screen size
    this.breakpointObserver.observe([Breakpoints.Handset]).subscribe(result => {
      this.displayedCardsCount = result.matches ? 3 : 6; // Mobile: 3, Desktop: 6
    });
  }

  fetchLearningZoneCards() {
    this.zoneService.getLearningZoneCards().subscribe((data: any[]) => {
      this.learningZoneCards = data.map(item => ({
        id_academic_tile: item.id_academic_tile,
        title: item.tile_name,
        image: item.tile_image,
        solved: '0/0',
        goals: '0'
      }));
    },
      (error) => {
        console.error('Error fetching learning zone cards:', error);
      });
  }

  fetchSkillZoneCards() {
    this.zoneService.getSkillZoneCards().subscribe((data: any[]) => {
      this.skillZoneCards = data.map(item => ({
        id_academic_tile: item.id_academic_tile,
        title: item.tile_name,
        image: item.tile_image,
        solved: '0/0',
        goals: '0'
      }));
    },
      (error) => {
        console.error('Error fetching skill zone cards:', error);
      });
  }
  navigateToZone(zoneName: string): void {
    const selectedZone = this.zones.find((zone) => zone.name === zoneName);
    if (selectedZone) {
      this.router.navigate([selectedZone.route]);
    }
  }

  navigateToLearningDetail(card: any) {
    this.router.navigate(['/learning-zone-category', card.id_academic_tile, encodeURIComponent(card.title)]);
  }

  navigateToSkillDetail(card: any) {
    this.router.navigate(['/skill-zone-category', card.id_academic_tile, encodeURIComponent(card.title)]);
  }
}
