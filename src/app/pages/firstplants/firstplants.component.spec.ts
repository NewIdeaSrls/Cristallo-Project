import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FirstplantsComponent } from './firstplants.component';

describe('FirstplantsComponent', () => {
  let component: FirstplantsComponent;
  let fixture: ComponentFixture<FirstplantsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FirstplantsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FirstplantsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
