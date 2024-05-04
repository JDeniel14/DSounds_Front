import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MiniElementoCarritoComponent } from './mini-elemento-carrito.component';

describe('MiniElementoCarritoComponent', () => {
  let component: MiniElementoCarritoComponent;
  let fixture: ComponentFixture<MiniElementoCarritoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MiniElementoCarritoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MiniElementoCarritoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
