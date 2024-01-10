import { TestBed } from '@angular/core/testing';

import { InMemoryContactsService } from './in-memory-contacts.service';

describe('InMemoryContactsService', () => {
  let service: InMemoryContactsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InMemoryContactsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
