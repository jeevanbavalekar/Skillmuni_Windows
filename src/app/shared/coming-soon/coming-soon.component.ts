import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-coming-soon',
  templateUrl: './coming-soon.component.html',
  styleUrls: ['./coming-soon.component.css'],
})
export class ComingSoonComponent {
  @Input() zoneTitle: string = '';
  @Input() subtitle: string = '';
  @Input() cardTitle: string = '';
  @Input() imageUrl: string = '';
  @Input() description: string = '';

  constructor(private location: Location,) { }
  onBackClick() {
    this.location.back();
  }
}
