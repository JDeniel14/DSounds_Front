import { TestBed } from '@angular/core/testing';

import { SubjectStorageService } from './subject-storage.service';

describe('SubjectStorageService', () => {
  let service: SubjectStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SubjectStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
