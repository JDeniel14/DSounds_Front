import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainPanelClienteComponentComponent } from './main-panel-cliente-component.component';

describe('MainPanelClienteComponentComponent', () => {
  let component: MainPanelClienteComponentComponent;
  let fixture: ComponentFixture<MainPanelClienteComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MainPanelClienteComponentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MainPanelClienteComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
