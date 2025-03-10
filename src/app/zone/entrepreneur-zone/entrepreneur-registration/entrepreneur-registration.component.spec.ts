import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntrepreneurRegistrationComponent } from './entrepreneur-registration.component';

describe('EntrepreneurRegistrationComponent', () => {
  let component: EntrepreneurRegistrationComponent;
  let fixture: ComponentFixture<EntrepreneurRegistrationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EntrepreneurRegistrationComponent]
    });
    fixture = TestBed.createComponent(EntrepreneurRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
