import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventsDsoundsComponent } from './events-dsounds.component';

describe('EventsDsoundsComponent', () => {
  let component: EventsDsoundsComponent;
  let fixture: ComponentFixture<EventsDsoundsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EventsDsoundsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EventsDsoundsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
