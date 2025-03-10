import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InternationalZoneComponent } from './international-zone.component';

describe('InternationalZoneComponent', () => {
  let component: InternationalZoneComponent;
  let fixture: ComponentFixture<InternationalZoneComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InternationalZoneComponent]
    });
    fixture = TestBed.createComponent(InternationalZoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
