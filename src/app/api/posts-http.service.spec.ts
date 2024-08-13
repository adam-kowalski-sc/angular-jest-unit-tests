import { TestBed } from "@angular/core/testing";

import { PostsHttpService } from "./posts-http.service";
import { provideHttpClientTesting } from "@angular/common/http/testing";
import { provideHttpClient } from "@angular/common/http";

describe("PostsHttpService", () => {
  let service: PostsHttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(PostsHttpService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
