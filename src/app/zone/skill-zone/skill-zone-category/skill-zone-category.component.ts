import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ZoneService } from 'src/app/services/zone.service';
import { LoaderService } from 'src/app/services/loader.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-skill-zone-category',
  templateUrl: './skill-zone-category.component.html',
  styleUrls: ['./skill-zone-category.component.css']
})
export class SkillZoneCategoryComponent implements OnInit {
  title: string = '';
  id_academic_tile: string = '';
  learnAndPlayCards: any[] = [];
  articles: any[] = [];
  showAd: boolean = true; // Initially visible

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private zoneService: ZoneService,
    private loaderService: LoaderService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.id_academic_tile = this.route.snapshot.paramMap.get('id') || '';
    this.title = decodeURIComponent(this.route.snapshot.paramMap.get('title') || '');
    if (this.id_academic_tile) {
      this.fetchBriefTiles(this.id_academic_tile);
    }
  }

  fetchBriefTiles(id_academic_tile: string) {
    this.zoneService.getBriefTiles(id_academic_tile).subscribe(
      (data: any[]) => {
        this.learnAndPlayCards = data.map(item => ({
          title: item.category_tile,
          image: item.tile_image,
          tileCode: item.tile_code,
          solved: '0/51', // Placeholder, modify if needed
          credits: '1'
        }));
      },
      error => {
        console.error('Error fetching brief tiles:', error);
      }
    );
  }

  // Fetch articles and navigate to the article page
  fetchBriefListWithAcademy(tileCode: string, id_academic_tile: string, cardTitle: string) {
    this.loaderService.show();
    this.zoneService.getBriefListwithAcademy(tileCode, id_academic_tile).subscribe(
      (data: any) => {
        if (data.BriefList && data.BriefList.length > 0) {
          this.articles = data.BriefList.map((brief: any) => {
            const resource = brief.briefResource?.find((res: any) => res.resource_type === 2);
            let mediaUrl = resource?.resouce_data;
            let isVideo = false;
            if (mediaUrl?.startsWith('http')) {
              isVideo = mediaUrl.includes('youtube.com') || mediaUrl.includes('youtu.be');
            } else {
              mediaUrl = `https://www.skillmuni.in/sulcmsproduction${resource?.brief_destination}${resource?.resouce_data}`;
            }
            return {
              articleTitle: brief.brief_title,
              articleContent: brief.briefResource?.find((res: any) => res.resource_type === 1)?.resouce_data || 'No content available',
              articleImage: mediaUrl,
              isVideo: isVideo,
              brief_code: brief.brief_code
            };
          });

          // Navigate to the article page passing data via router state
          this.router.navigate(['/article'], {
            state: { articles: this.articles, title: 'Skill Zone', subtitle: cardTitle }
          });
        } else {
          console.warn("No articles found for this tile.");
        }
        this.loaderService.hide();
      },
      error => {
        console.error("Error fetching brief list:", error);
        this.loaderService.hide();
      }
    );
  }

  hideAd() {
    this.showAd = false;
  }

  onBackClick() {
    this.location.back();
  }
}
