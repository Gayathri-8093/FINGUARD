import { TestBed } from '@angular/core/testing';

import { CustomerTxService } from './customer-tx-service';

describe('CustomerTxService', () => {
  let service: CustomerTxService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomerTxService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
