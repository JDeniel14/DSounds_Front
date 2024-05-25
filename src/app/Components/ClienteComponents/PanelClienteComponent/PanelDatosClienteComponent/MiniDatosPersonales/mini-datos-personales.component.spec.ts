import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MiniDatosPersonalesComponent } from './mini-datos-personales.component';

describe('MiniDatosPersonalesComponent', () => {
  let component: MiniDatosPersonalesComponent;
  let fixture: ComponentFixture<MiniDatosPersonalesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MiniDatosPersonalesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MiniDatosPersonalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
