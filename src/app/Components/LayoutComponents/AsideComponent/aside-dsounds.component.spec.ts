import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsideDsoundsComponent } from './aside-dsounds.component';

describe('AsideDsoundsComponent', () => {
  let component: AsideDsoundsComponent;
  let fixture: ComponentFixture<AsideDsoundsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AsideDsoundsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AsideDsoundsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
