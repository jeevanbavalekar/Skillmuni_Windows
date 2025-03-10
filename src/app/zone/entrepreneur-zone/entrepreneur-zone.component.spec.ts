import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntrepreneurZoneComponent } from './entrepreneur-zone.component';

describe('EntrepreneurZoneComponent', () => {
  let component: EntrepreneurZoneComponent;
  let fixture: ComponentFixture<EntrepreneurZoneComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EntrepreneurZoneComponent]
    });
    fixture = TestBed.createComponent(EntrepreneurZoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
