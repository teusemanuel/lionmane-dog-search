import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubBreedsComponent } from './sub-breeds.component';

describe('SubBreedsComponent', () => {
  let component: SubBreedsComponent;
  let fixture: ComponentFixture<SubBreedsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubBreedsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubBreedsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
