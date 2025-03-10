import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ZoneService } from 'src/app/services/zone.service';
import { Location } from '@angular/common';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'app-learning-zone',
  templateUrl: './learning-zone.component.html',
  styleUrls: ['./learning-zone.component.css']
})
export class LearningZoneComponent implements OnInit {
  knowledgeHubCollapsed: boolean = true;
  showComingSoon: boolean = false;
  showAd: boolean = true; // Initially visible
  learningZoneCards: any[] = [];
  knowledgeHubCards: any[] = [];
  previousUrl: string = '';
  isMobileView: boolean = false; // Track screen size
  comingSoonData = {
    zoneTitle: 'Learning Zone',
    subtitle: 'NATION WANTS TO KNOW',
    cardTitle: 'Get Ready for Something Big!',
    imageUrl: 'assets/cards/rocket.png',
    description: 'Nation Wants to Know is gearing up for an exciting debate competition. Stay tuned for updates and be the first to join!'
  };

  constructor(private router: Router, private zoneService: ZoneService,private location: Location, private breakpointObserver: BreakpointObserver) { }

  ngOnInit(): void {
    this.fetchLearningZoneCards();
     // Observe screen size
     this.breakpointObserver.observe([Breakpoints.Handset]).subscribe(result => {
      this.isMobileView = result.matches;
    });
  }

  fetchLearningZoneCards() {
    this.zoneService.getLearningZoneCards().subscribe((data: any[]) => {
      // Separate data based on theme_id
      this.knowledgeHubCards = data
        .filter(item => item.status === "A" && item.theme_id === 2) // For .card (theme_id = 2)
        .map(item => ({
          id_academic_tile: item.id_academic_tile,
          title: item.tile_name,
          image: item.tile_image,
          solved: '0/0',
          goals: '0'
        }));

      this.learningZoneCards = data
        .filter(item => item.status === "A" && item.theme_id === 1) // For .play-card (theme_id = 1)
        .map(item => ({
          id_academic_tile: item.id_academic_tile,
          title: item.tile_name,
          image: item.tile_image,
          solved: '1111/9999',
          credits: '99'
        }));
    },
      (error) => {
        console.error('Error fetching learning zone cards:', error);
      }
    );
  }




  navigateToDetail(card: any) {
    this.previousUrl = this.router.url; // Store current page before navigating
  
    if (card.title.toLowerCase() === 'nation wants to know') {
      this.comingSoonData;
      this.showComingSoon = true;
    } 
    else if (card.title.toLowerCase() === 'your wishlist') {
      this.router.navigate(['/your-wishlist']);
    } 
    else {
      const specialCards = ["Global Gyan", "Whats the good word"];
      if (specialCards.includes(card.title)) {
        this.zoneService.getLearningZoneCards().subscribe((data: any[]) => {
          const selectedCard = data.find(item => item.tile_name === card.title);
          if (selectedCard && selectedCard.url) {
            // Navigate to external URL
            window.location.href = selectedCard.url;
          }
        });
      } 
      else {
        this.router.navigate(['/learning-zone-category', card.id_academic_tile, encodeURIComponent(card.title)]);
      }
    }
  }
  


  navigateToComingSoon() {
    this.showComingSoon = true;  // Show the coming-soon component
  }

  toggleKnowledgeHub() {
    this.knowledgeHubCollapsed = !this.knowledgeHubCollapsed;
  }

  hideAd() {
    this.showAd = false; // Hides the ad on click
  }

  onBackClick() {
    if (this.previousUrl) {
      this.router.navigateByUrl(this.previousUrl);
    } else {
      this.location.back(); // Default behavior if no previous URL is stored
    }
  }
  
}
