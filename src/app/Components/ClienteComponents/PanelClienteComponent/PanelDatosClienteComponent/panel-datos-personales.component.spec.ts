import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelDatosPersonalesComponent } from './panel-datos-personales.component';

describe('PanelDatosPersonalesComponent', () => {
  let component: PanelDatosPersonalesComponent;
  let fixture: ComponentFixture<PanelDatosPersonalesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PanelDatosPersonalesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PanelDatosPersonalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
