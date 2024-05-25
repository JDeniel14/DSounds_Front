import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MiniCambiarPasswordClienteComponent } from './mini-cambiar-password-cliente.component';

describe('MiniCambiarPasswordClienteComponent', () => {
  let component: MiniCambiarPasswordClienteComponent;
  let fixture: ComponentFixture<MiniCambiarPasswordClienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MiniCambiarPasswordClienteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MiniCambiarPasswordClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
