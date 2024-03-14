import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MdselectComponent } from './mdselect.component';

describe('MdselectComponent', () => {
  let component: MdselectComponent;
  let fixture: ComponentFixture<MdselectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MdselectComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MdselectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
