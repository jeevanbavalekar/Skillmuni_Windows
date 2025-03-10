import { Component } from '@angular/core';
import { Location } from '@angular/common';


@Component({
  selector: 'app-career-evaluation',
  templateUrl: './career-evaluation.component.html',
  styleUrls: ['./career-evaluation.component.css']
})
export class CareerEvaluationComponent {
  title: string = "career evaluations"

  constructor(private location: Location) { }
  onBackClick() {
    this.location.back();
  }
}