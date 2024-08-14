import { TestBed } from "@angular/core/testing";

import { PostsHttpService } from "./posts-http.service";
import {
  HttpTestingController,
  provideHttpClientTesting,
} from "@angular/common/http/testing";
import { provideHttpClient } from "@angular/common/http";
import { PostDto } from "./posts-http.interfaces";

describe("PostsHttpService", () => {
  let service: PostsHttpService;
  let httpTestingController: HttpTestingController;

  const posts: PostDto[] = [
    {
      id: 1,
      title: "Test 1",
      content: "Test content 2",
      userId: 1,
    },
    {
      id: 1,
      title: "Test 1",
      content: "Test content 2",
      userId: 1,
    },
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(PostsHttpService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    TestBed.inject(HttpTestingController).verify();
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });

  it("get should make GET request and return array of 2 posts", () => {
    service.get().subscribe((posts) => {
      expect(posts).toBeTruthy();
      expect(posts).toHaveLength(2);
    });

    const req = httpTestingController.expectOne("posts");

    expect(req.request.method).toEqual("GET");

    req.flush(posts);
  });

  it("delete should make DELETE request and return deleted item", () => {
    const postId = 1;
    const post = {
      id: postId,
      title: "Test 1",
      content: "Test content 2",
      userId: 1,
    };

    service.delete(postId).subscribe((post) => {
      expect(post).toEqual(post);
    });

    const req = httpTestingController.expectOne(`posts/${postId}`);

    expect(req.request.method).toEqual("DELETE");

    req.flush(post);
  });

  it("post should make POST request and return created item", () => {
    const createdItem = {
      title: "Test 1",
      content: "Test content 2",
      userId: 1,
    };

    const returnedPost = {
      id: 2,
      ...createdItem,
    };

    service.post(createdItem).subscribe((post) => {
      expect(post).toEqual(post);
    });

    const req = httpTestingController.expectOne("posts");

    expect(req.request.method).toEqual("POST");

    req.flush(returnedPost);
  });
});
