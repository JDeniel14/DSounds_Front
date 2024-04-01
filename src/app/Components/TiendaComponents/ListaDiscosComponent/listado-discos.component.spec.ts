import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoDiscosComponent } from './listado-discos.component';

describe('ListadoDiscosComponent', () => {
  let component: ListadoDiscosComponent;
  let fixture: ComponentFixture<ListadoDiscosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListadoDiscosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListadoDiscosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
