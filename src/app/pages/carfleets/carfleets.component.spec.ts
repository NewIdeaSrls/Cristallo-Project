import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarfleetsComponent } from './carfleets.component';

describe('CarfleetsComponent', () => {
  let component: CarfleetsComponent;
  let fixture: ComponentFixture<CarfleetsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarfleetsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CarfleetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
