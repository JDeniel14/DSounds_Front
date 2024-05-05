import { TestBed } from '@angular/core/testing';

import { AccesoPagoGuard } from './acceso-pago.guard';

describe('AccesoPagoGuard', () => {
  let guard: AccesoPagoGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AccesoPagoGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
