import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkillZoneCategoryComponent } from './skill-zone-category.component';

describe('SkillZoneCategoryComponent', () => {
  let component: SkillZoneCategoryComponent;
  let fixture: ComponentFixture<SkillZoneCategoryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SkillZoneCategoryComponent]
    });
    fixture = TestBed.createComponent(SkillZoneCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
