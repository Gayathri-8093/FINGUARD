import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerOnboardingList } from './customer-onboarding-list';

describe('CustomerOnboardingList', () => {
  let component: CustomerOnboardingList;
  let fixture: ComponentFixture<CustomerOnboardingList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomerOnboardingList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomerOnboardingList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
