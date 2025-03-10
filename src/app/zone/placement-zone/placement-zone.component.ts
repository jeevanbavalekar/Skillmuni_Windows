import { Component } from '@angular/core';

@Component({
  selector: 'app-placement-zone',
  templateUrl: './placement-zone.component.html',
  styleUrls: ['./placement-zone.component.css']
})
export class PlacementZoneComponent {
  jobCategories = [
    { name: 'Insurance', icon: 'assets/icons/placement-zone-icons/insurance.png' },
    { name: 'ITES', icon: 'assets/icons/placement-zone-icons/ites.png' },
    { name: 'Hospitality', icon: 'assets/icons/placement-zone-icons/hospitality.png' },
    { name: 'Engineering', icon: 'assets/icons/placement-zone-icons/engineering.png' },
    { name: 'Pharmaceutical', icon: 'assets/icons/placement-zone-icons/pharmaceutical.png' },
    { name: 'NGO', icon: 'assets/icons/placement-zone-icons/ngo.png' },
    { name: 'Game Development', icon: 'assets/icons/placement-zone-icons/game-development.png' },
    { name: 'Retail', icon: 'assets/icons/placement-zone-icons/retail.png' },
    { name: 'Fashion Retail', icon: 'assets/icons/placement-zone-icons/fashion-retail.png' }
  ];
}
