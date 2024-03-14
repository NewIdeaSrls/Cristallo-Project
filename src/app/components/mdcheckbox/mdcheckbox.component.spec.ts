import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MdcheckboxComponent } from './mdcheckbox.component';

describe('MdcheckboxComponent', () => {
  let component: MdcheckboxComponent;
  let fixture: ComponentFixture<MdcheckboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MdcheckboxComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MdcheckboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
