import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TxMonitoring } from './tx-monitoring';

describe('TxMonitoring', () => {
  let component: TxMonitoring;
  let fixture: ComponentFixture<TxMonitoring>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TxMonitoring]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TxMonitoring);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
