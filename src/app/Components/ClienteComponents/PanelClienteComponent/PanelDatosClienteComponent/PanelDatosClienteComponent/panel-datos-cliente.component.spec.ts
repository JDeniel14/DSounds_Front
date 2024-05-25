import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelDatosClienteComponent } from './panel-datos-cliente.component';

describe('PanelDatosClienteComponent', () => {
  let component: PanelDatosClienteComponent;
  let fixture: ComponentFixture<PanelDatosClienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PanelDatosClienteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PanelDatosClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
