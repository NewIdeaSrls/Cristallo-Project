import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MdchipComponent } from './mdchip.component';

describe('MdchipComponent', () => {
  let component: MdchipComponent;
  let fixture: ComponentFixture<MdchipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MdchipComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MdchipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
