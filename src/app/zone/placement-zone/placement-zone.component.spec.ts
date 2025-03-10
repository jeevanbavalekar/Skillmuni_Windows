import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlacementZoneComponent } from './placement-zone.component';

describe('PlacementZoneComponent', () => {
  let component: PlacementZoneComponent;
  let fixture: ComponentFixture<PlacementZoneComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PlacementZoneComponent]
    });
    fixture = TestBed.createComponent(PlacementZoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
