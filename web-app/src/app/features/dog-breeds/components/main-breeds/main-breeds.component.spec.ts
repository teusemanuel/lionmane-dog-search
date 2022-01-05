import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainBreedsComponent } from './main-breeds.component';

describe('MainBreedsComponent', () => {
  let component: MainBreedsComponent;
  let fixture: ComponentFixture<MainBreedsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainBreedsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MainBreedsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
