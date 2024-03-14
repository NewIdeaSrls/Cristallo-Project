import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsurancesOfficesComponent } from './insurances-offices.component';

describe('InsurancesOfficesComponent', () => {
  let component: InsurancesOfficesComponent;
  let fixture: ComponentFixture<InsurancesOfficesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InsurancesOfficesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InsurancesOfficesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
