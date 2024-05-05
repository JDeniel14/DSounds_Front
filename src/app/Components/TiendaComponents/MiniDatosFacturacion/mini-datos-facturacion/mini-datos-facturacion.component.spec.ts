import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MiniDatosFacturacionComponent } from './mini-datos-facturacion.component';

describe('MiniDatosFacturacionComponent', () => {
  let component: MiniDatosFacturacionComponent;
  let fixture: ComponentFixture<MiniDatosFacturacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MiniDatosFacturacionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MiniDatosFacturacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
