import { TestBed } from '@angular/core/testing';

import { UsersContainerService } from './users-container.service';

describe('UsersContainerService', () => {
  let service: UsersContainerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UsersContainerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
