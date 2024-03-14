import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MDTableComponent } from './mdtable.component';

describe('MDTableComponent', () => {
  let component: MDTableComponent;
  let fixture: ComponentFixture<MDTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MDTableComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MDTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
