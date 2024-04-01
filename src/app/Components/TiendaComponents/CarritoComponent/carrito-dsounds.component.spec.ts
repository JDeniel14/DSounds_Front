import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarritoDSoundsComponent } from './carrito-dsounds.component';

describe('CarritoDSoundsComponent', () => {
  let component: CarritoDSoundsComponent;
  let fixture: ComponentFixture<CarritoDSoundsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarritoDSoundsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CarritoDSoundsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
