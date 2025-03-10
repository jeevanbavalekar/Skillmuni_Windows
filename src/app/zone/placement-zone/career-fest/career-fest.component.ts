import { Component } from '@angular/core';
import { Location } from '@angular/common';


@Component({
  selector: 'app-career-fest',
  templateUrl: './career-fest.component.html',
  styleUrls: ['./career-fest.component.css']
})
export class CareerFestComponent {
  title: string = "career fest"

  constructor(private location: Location) { }
  onBackClick() {
    this.location.back();
  }
}
