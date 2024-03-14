import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountingComponent } from './AccountingComponent';

describe('AccountingComponent', () => {
  let component: AccountingComponent;
  let fixture: ComponentFixture<AccountingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccountingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AccountingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
