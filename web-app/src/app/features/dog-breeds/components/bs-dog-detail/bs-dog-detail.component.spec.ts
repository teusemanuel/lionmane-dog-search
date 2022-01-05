import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BsDogDetailComponent } from './bs-dog-detail.component';

describe('BsDogDetailComponent', () => {
  let component: BsDogDetailComponent;
  let fixture: ComponentFixture<BsDogDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BsDogDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BsDogDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
