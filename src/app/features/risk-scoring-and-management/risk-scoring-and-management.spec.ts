import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RiskScoringAndManagement } from './risk-scoring-and-management';

describe('RiskScoringAndManagement', () => {
  let component: RiskScoringAndManagement;
  let fixture: ComponentFixture<RiskScoringAndManagement>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RiskScoringAndManagement]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RiskScoringAndManagement);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
