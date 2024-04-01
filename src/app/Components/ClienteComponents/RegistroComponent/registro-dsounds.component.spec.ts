import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroDsoundsComponent } from './registro-dsounds.component';

describe('RegistroDsoundsComponent', () => {
  let component: RegistroDsoundsComponent;
  let fixture: ComponentFixture<RegistroDsoundsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistroDsoundsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RegistroDsoundsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
