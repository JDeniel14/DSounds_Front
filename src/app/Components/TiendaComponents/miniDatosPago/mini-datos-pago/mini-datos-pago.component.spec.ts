import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MiniDatosPagoComponent } from './mini-datos-pago.component';

describe('MiniDatosPagoComponent', () => {
  let component: MiniDatosPagoComponent;
  let fixture: ComponentFixture<MiniDatosPagoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MiniDatosPagoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MiniDatosPagoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
