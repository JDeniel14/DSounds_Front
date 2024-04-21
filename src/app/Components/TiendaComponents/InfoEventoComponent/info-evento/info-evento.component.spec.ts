import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoEventoComponent } from './info-evento.component';

describe('InfoEventoComponent', () => {
  let component: InfoEventoComponent;
  let fixture: ComponentFixture<InfoEventoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InfoEventoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InfoEventoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
