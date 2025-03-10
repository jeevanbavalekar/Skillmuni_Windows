import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZoneArticlesComponent } from './zone-articles.component';

describe('ZoneArticlesComponent', () => {
  let component: ZoneArticlesComponent;
  let fixture: ComponentFixture<ZoneArticlesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ZoneArticlesComponent]
    });
    fixture = TestBed.createComponent(ZoneArticlesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
