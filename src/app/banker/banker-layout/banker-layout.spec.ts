import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BankerLayout } from './banker-layout';

describe('BankerLayout', () => {
  let component: BankerLayout;
  let fixture: ComponentFixture<BankerLayout>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BankerLayout]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BankerLayout);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
