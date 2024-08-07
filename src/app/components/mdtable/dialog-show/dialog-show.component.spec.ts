import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogShowComponent } from './dialog-show.component';

describe('DialogShowComponent', () => {
  let component: DialogShowComponent;
  let fixture: ComponentFixture<DialogShowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogShowComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DialogShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
