import { TestBed } from '@angular/core/testing';

import { PostsContainerService } from './posts-container.service';

describe('PostsContainerService', () => {
  let service: PostsContainerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PostsContainerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
