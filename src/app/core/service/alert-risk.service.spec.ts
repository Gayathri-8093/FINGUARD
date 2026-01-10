import { TestBed } from '@angular/core/testing';

import { AlertRiskService } from './alert-risk.service';

describe('AlertRiskService', () => {
  let service: AlertRiskService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AlertRiskService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
