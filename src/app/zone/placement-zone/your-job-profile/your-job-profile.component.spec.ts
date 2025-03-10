import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YourJobProfileComponent } from './your-job-profile.component';

describe('YourJobProfileComponent', () => {
  let component: YourJobProfileComponent;
  let fixture: ComponentFixture<YourJobProfileComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [YourJobProfileComponent]
    });
    fixture = TestBed.createComponent(YourJobProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
