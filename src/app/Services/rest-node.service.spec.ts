import { TestBed } from '@angular/core/testing';

import { RestNodeService } from './rest-node.service';

describe('RestNodeService', () => {
  let service: RestNodeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RestNodeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
