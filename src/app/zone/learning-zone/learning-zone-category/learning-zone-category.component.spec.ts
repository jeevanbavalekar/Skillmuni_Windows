import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LearningZoneCategoryComponent } from './learning-zone-category.component';

describe('LearningZoneCategoryComponent', () => {
  let component: LearningZoneCategoryComponent;
  let fixture: ComponentFixture<LearningZoneCategoryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LearningZoneCategoryComponent]
    });
    fixture = TestBed.createComponent(LearningZoneCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
