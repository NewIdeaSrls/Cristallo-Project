import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrandsAndModelsComponent } from './brands-and-models.component';

describe('BrandsAndModelsComponent', () => {
  let component: BrandsAndModelsComponent;
  let fixture: ComponentFixture<BrandsAndModelsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BrandsAndModelsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BrandsAndModelsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
