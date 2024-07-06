import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OriginalpartsComponent } from './originalparts.component';

describe('OriginalpartsComponent', () => {
  let component: OriginalpartsComponent;
  let fixture: ComponentFixture<OriginalpartsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OriginalpartsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OriginalpartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
