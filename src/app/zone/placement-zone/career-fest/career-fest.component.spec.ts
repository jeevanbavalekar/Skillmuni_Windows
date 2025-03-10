import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CareerFestComponent } from './career-fest.component';

describe('CareerFestComponent', () => {
  let component: CareerFestComponent;
  let fixture: ComponentFixture<CareerFestComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CareerFestComponent]
    });
    fixture = TestBed.createComponent(CareerFestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
