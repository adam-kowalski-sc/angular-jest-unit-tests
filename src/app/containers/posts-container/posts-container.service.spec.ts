import { TestBed } from "@angular/core/testing";

import { PostsContainerService } from "./posts-container.service";
import { UsersHttpService } from "../../api/users-http.service";
import { PostsHttpService } from "../../api/posts-http.service";

describe("PostsContainerService", () => {
  let service: PostsContainerService;

  const usersHttpStubService: Partial<UsersHttpService> = {};
  const postsHttpStubService: Partial<PostsHttpService> = {};

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        PostsContainerService,
        {
          provide: UsersHttpService,
          useValue: usersHttpStubService
        },
        {
          provide: PostsHttpService,
          useValue: postsHttpStubService
        },
      ],
    });
    service = TestBed.inject(PostsContainerService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
