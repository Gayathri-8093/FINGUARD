import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalyticsAndDashboard } from './analytics-and-dashboard';

describe('AnalyticsAndDashboard', () => {
  let component: AnalyticsAndDashboard;
  let fixture: ComponentFixture<AnalyticsAndDashboard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnalyticsAndDashboard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnalyticsAndDashboard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
