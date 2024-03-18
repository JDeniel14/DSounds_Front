import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuDsoundsComponent } from './menu-dsounds.component';

describe('MenuDsoundsComponent', () => {
  let component: MenuDsoundsComponent;
  let fixture: ComponentFixture<MenuDsoundsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MenuDsoundsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MenuDsoundsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
