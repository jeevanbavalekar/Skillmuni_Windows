import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkillZoneComponent } from './skill-zone.component';

describe('SkillZoneComponent', () => {
  let component: SkillZoneComponent;
  let fixture: ComponentFixture<SkillZoneComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SkillZoneComponent]
    });
    fixture = TestBed.createComponent(SkillZoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
