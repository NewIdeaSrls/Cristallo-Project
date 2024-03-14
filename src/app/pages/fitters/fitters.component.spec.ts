import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FittersComponent } from './fitters.component';

describe('FittersComponent', () => {
  let component: FittersComponent;
  let fixture: ComponentFixture<FittersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FittersComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FittersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
