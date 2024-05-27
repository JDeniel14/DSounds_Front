import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MiniDireccionesClienteComponent } from './mini-direcciones-cliente.component';

describe('MiniDireccionesClienteComponent', () => {
  let component: MiniDireccionesClienteComponent;
  let fixture: ComponentFixture<MiniDireccionesClienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MiniDireccionesClienteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MiniDireccionesClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
