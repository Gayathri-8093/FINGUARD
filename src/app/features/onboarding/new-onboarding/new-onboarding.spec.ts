import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewOnboarding } from './new-onboarding';

describe('NewOnboarding', () => {
  let component: NewOnboarding;
  let fixture: ComponentFixture<NewOnboarding>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewOnboarding]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewOnboarding);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
