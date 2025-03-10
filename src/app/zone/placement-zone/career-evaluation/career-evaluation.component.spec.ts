import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CareerEvaluationComponent } from './career-evaluation.component';

describe('CareerEvaluationComponent', () => {
  let component: CareerEvaluationComponent;
  let fixture: ComponentFixture<CareerEvaluationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CareerEvaluationComponent]
    });
    fixture = TestBed.createComponent(CareerEvaluationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
