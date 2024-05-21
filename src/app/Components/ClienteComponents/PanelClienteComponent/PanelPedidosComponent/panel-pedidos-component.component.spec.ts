import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelPedidosComponentComponent } from './panel-pedidos-component.component';

describe('PanelPedidosComponentComponent', () => {
  let component: PanelPedidosComponentComponent;
  let fixture: ComponentFixture<PanelPedidosComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PanelPedidosComponentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PanelPedidosComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
