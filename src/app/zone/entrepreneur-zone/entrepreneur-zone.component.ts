import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoaderService } from 'src/app/services/loader.service';
import { ZoneService } from 'src/app/services/zone.service';

@Component({
  selector: 'app-entrepreneur-zone',
  templateUrl: './entrepreneur-zone.component.html',
  styleUrls: ['./entrepreneur-zone.component.css'],
})
export class EntrepreneurZoneComponent implements OnInit {
  opportunityCards: any[] = [];
  showComingSoon: boolean = false;  // Controls visibility of the coming-soon component
  articles: any[] = [];
  id_academic_tile: string = '';
  showAd: boolean = true; // Initially visible

  comingSoonData = {
    zoneTitle: 'Entrepreneur Zone',
    subtitle: 'ASSESSMENT',
    cardTitle: 'Something Exciting Coming Your Way!',
    imageUrl: 'assets/cards/entrepreneurial-quotient.jpg',
    description: 'Get ready to explore your entrepreneurial strengths and uncover the skills that set you apart. This assessment is designed to guide you on your journey to success. Coming soon!'
  };

  constructor(
    private router: Router,
    private zoneService: ZoneService,
    private loaderService: LoaderService
  ) { }

  ngOnInit(): void {
    // Fetch Entrepreneur Opportunities
    this.zoneService.getEntrepreneurOpportunities().subscribe(
      response => {
        if (response.Status === 'SUCCESS' && response.Tile) {
          this.opportunityCards = response.Tile.map((tile: any) => ({
            title: tile.category_tile,
            description: tile.tile_description,
            image: tile.tile_image,
            tileCode: tile.tile_code,  // Extract tile_code (ENC)
            id_academic_tile: tile.id_academic_tile  // Use academic tile ID (adjust property name if needed)
          }));
        }
      },
      error => {
        console.error('Error fetching opportunities:', error);
      }
    );
  }

  // Fetch Articles when an Opportunity is Clicked
  fetchBriefListWithAcademy(tileCode: string, cardTitle: string, id_academic_tile: string) {
    this.loaderService.show();
    this.zoneService.getBriefListwithAcademy(tileCode, id_academic_tile).subscribe(
      (data: any) => {
        if (data.BriefList && data.BriefList.length > 0) {
          this.articles = data.BriefList.map((brief: any) => {
            const resource = brief.briefResource.find((res: any) => res.resource_type === 2);
            let mediaUrl = resource?.resouce_data;
            let isVideo = false;
            if (mediaUrl?.startsWith('http')) {
              isVideo = mediaUrl.includes('youtube.com') || mediaUrl.includes('youtu.be');
            } else {
              mediaUrl = `https://www.skillmuni.in/sulcmsproduction${resource?.brief_destination}${resource?.resouce_data}`;
            }
            return {
              articleTitle: brief.brief_title,
              articleContent: brief.briefResource.find((res: any) => res.resource_type === 1)?.resouce_data || 'No content available',
              articleImage: mediaUrl,
              isVideo: isVideo,
              brief_code: brief.brief_code  // Ensure brief_code is included for assessment navigation
            };
          });
          // Navigate to the dedicated article page, passing articles, fixed title, and card title as subtitle
          this.router.navigate(['/article'], {
            state: { articles: this.articles, title: 'Entrepreneur Zone', subtitle: cardTitle }
          });
        }
        this.loaderService.hide();
      },
      error => {
        console.error('Error fetching brief list:', error);
        this.loaderService.hide();
      }
    );
  }


  showComingSoonMessage() {
    this.showComingSoon = true;
  }

  hideAd() {
    this.showAd = false; // Hides the ad on click
  }
}
