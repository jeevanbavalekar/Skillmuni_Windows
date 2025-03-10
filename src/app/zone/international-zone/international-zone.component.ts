import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ZoneService } from 'src/app/services/zone.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-international-zone',
  templateUrl: './international-zone.component.html',
  styleUrls: ['./international-zone.component.css'],
})
export class InternationalZoneComponent implements OnInit {
  places: any[] = [];
  zoneTitle: string = 'International Zone';
  showInternationalZone: boolean = true; // Always show the zone container

  constructor(private router: Router, private zoneService: ZoneService,private location: Location) { }

  ngOnInit(): void {
    this.zoneService.getPlaces().subscribe(
      (response) => {
        if (response.Status === 'SUCCESS' && response.Tile) {
          this.places = response.Tile.map((item: { category_tile: any; tile_image: any; tile_code: any }) => ({
            name: item.category_tile,
            image: item.tile_image,
            tileCode: item.tile_code,
          }));
        }
      },
      (error) => {
        console.error('Error fetching country data:', error);
      }
    );
  }

  navigateToPlace(place: { name: string; tileCode: string }) {
    // Instead of displaying inline zone details, fetch articles and navigate to the article page.
    this.fetchZoneArticles(place);
  }

  fetchZoneArticles(place: { name: string; tileCode: string }) {
    this.zoneService.getBriefListwithAcademy(place.tileCode, '37').subscribe(
      (response) => {
        let zoneArticles: any[] = [];
        if (response && Array.isArray(response.BriefList)) {
          zoneArticles = response.BriefList.map((item: any) => {
            const resource1 = item.briefResource.find((res: any) => res.resource_type === 1);
            const resource2 = item.briefResource.find((res: any) => res.resource_type === 2);
            let mediaUrl = '';
            let isVideo = false;
            if (resource2) {
              mediaUrl = resource2.resouce_data;
              if (mediaUrl?.startsWith('http')) {
                isVideo = mediaUrl.includes('youtube.com') || mediaUrl.includes('youtu.be');
              } else {
                mediaUrl = `https://www.skillmuni.in/sulcmsproduction${resource2.brief_destination}${resource2.resouce_data}`;
              }
            }
            return {
              articleTitle: item.brief_title,
              articleContent: resource1?.resouce_data || 'No content available',
              articleImage: mediaUrl,
              isVideo: isVideo,
              brief_code: item.brief_code  // Ensure the brief_code property is included
            };
          });
        } else {
          console.error('BriefList not found or not an array:', response);
        }
        // Navigate to the article page, passing the articles, zone title, and place name as subtitle
        this.router.navigate(['/article'], {
          state: { articles: zoneArticles, title: this.zoneTitle, subtitle: place.name }
        });
      },
      (error) => {
        console.error('Error fetching articles:', error);
      }
    );
  }

  onBackClick() {
    this.location.back();
  }
}
