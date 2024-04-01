import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginDsoundsComponent } from './login-dsounds.component';

describe('LoginDsoundsComponent', () => {
  let component: LoginDsoundsComponent;
  let fixture: ComponentFixture<LoginDsoundsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginDsoundsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LoginDsoundsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
