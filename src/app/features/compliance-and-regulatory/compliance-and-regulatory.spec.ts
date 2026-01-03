import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComplianceAndRegulatory } from './compliance-and-regulatory';

describe('ComplianceAndRegulatory', () => {
  let component: ComplianceAndRegulatory;
  let fixture: ComponentFixture<ComplianceAndRegulatory>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComplianceAndRegulatory]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComplianceAndRegulatory);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
