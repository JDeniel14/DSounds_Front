import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MiniEventoComponent } from './mini-evento.component';

describe('MiniEventoComponent', () => {
  let component: MiniEventoComponent;
  let fixture: ComponentFixture<MiniEventoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MiniEventoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MiniEventoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
