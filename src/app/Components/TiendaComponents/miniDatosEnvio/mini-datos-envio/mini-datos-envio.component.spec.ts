import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MiniDatosEnvioComponent } from './mini-datos-envio.component';

describe('MiniDatosEnvioComponent', () => {
  let component: MiniDatosEnvioComponent;
  let fixture: ComponentFixture<MiniDatosEnvioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MiniDatosEnvioComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MiniDatosEnvioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
