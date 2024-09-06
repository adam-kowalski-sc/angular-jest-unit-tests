import { fakeAsync, TestBed, tick, waitForAsync } from "@angular/core/testing";

import { PostsContainerService } from "./posts-container.service";
import { UsersHttpService } from "../../api/users-http.service";
import { PostsHttpService } from "../../api/posts-http.service";
import { UserDto } from "../../api/users-http.interfaces";
import { of, throwError } from "rxjs";
import { PostDto } from "../../api/posts-http.interfaces";

describe("PostsContainerService", () => {
  let service: PostsContainerService;

  const users: UserDto[] = [
    {
      id: 1,
      name: "Alex",
      surname: "Kowalski",
    },
    {
      id: 2,
      name: "Jan",
      surname: "Testowy",
    },
  ];

  const posts: PostDto[] = [
    {
      title: "title 1",
      content: "content 1",
      id: 1,
      userId: 1,
    },
    {
      title: "title 2",
      content: "content 2",
      id: 2,
      userId: 1,
    },
    {
      title: "title 3",
      content: "content 3",
      id: 3,
      userId: 2,
    },
  ];

  const usersHttpStubService: Partial<UsersHttpService> = {
    get: jest.fn().mockReturnValue(of(users)),
  };
  const postsHttpStubService: Partial<PostsHttpService> = {
    get: jest.fn().mockReturnValue(of(posts)),
    delete: jest.fn().mockReturnValue(of({})),
    post: jest.fn().mockReturnValue(of({})),
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        PostsContainerService,
        {
          provide: UsersHttpService,
          useValue: usersHttpStubService,
        },
        {
          provide: PostsHttpService,
          useValue: postsHttpStubService,
        },
      ],
    });
    service = TestBed.inject(PostsContainerService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });

  it("loadPosts call http get methods to get users and posts", () => {
    const usersSpy = jest.spyOn(usersHttpStubService, "get");
    const postsSpy = jest.spyOn(postsHttpStubService, "get");

    service.loadPosts();

    expect(usersSpy).toHaveBeenCalled();
    expect(postsSpy).toHaveBeenCalled();
  });

  it("after loading posts getPosts method should return not empty array of posts with proper format", (done) => {
    service.loadPosts();

    service.getPosts().subscribe((items) => {
      expect(items).toHaveLength(posts.length);
      expect(items[0]).toEqual({
        title: posts[0].title,
        content: posts[0].content,
        id: posts[0].id,
        author: `${users[0].name} ${users[0].surname}`,
      });

      expect(items[1]).toEqual(
        expect.objectContaining({
          title: posts[1].title,
          content: posts[1].content,
        })
      );

      done();
    });
  });

  it("after loading posts getPosts method should return not empty array of posts with proper format - wait for async", waitForAsync(() => {
    service.loadPosts();

    service.getPosts().subscribe((items) => {
      expect(items).toHaveLength(posts.length);
      expect(items[0]).toEqual({
        title: posts[0].title,
        content: posts[0].content,
        id: posts[0].id,
        author: `${users[0].name} ${users[0].surname}`,
      });
    });
  }));

  it("after loading posts getPosts method should return not empty array of posts with proper format - fake async", fakeAsync(() => {
    service.loadPosts();

    tick(100);

    service.getPosts().subscribe((items) => {
      expect(items).toHaveLength(posts.length);
      expect(items[0]).toEqual({
        title: posts[0].title,
        content: posts[0].content,
        id: posts[0].id,
        author: `${users[0].name} ${users[0].surname}`,
      });
    });
  }));

  it("deletePost should call delete method from posts http service and reload posts", () => {
    const postId = 1;

    const deleteSpy = jest.spyOn(postsHttpStubService, "delete");
    const loadSpy = jest.spyOn(service, "loadPosts");

    service.deletePost(postId);

    expect(deleteSpy).toHaveBeenCalledWith(postId);
    expect(loadSpy).toHaveBeenCalled();
  });

  it("createPost should call post method from posts http service and reload posts", () => {
    const createSpy = jest.spyOn(postsHttpStubService, "post");
    const loadSpy = jest.spyOn(service, "loadPosts");

    const newPost = {
      title: "title 1",
      content: "content 1",
      userId: 1,
    };

    service.createPost(newPost);

    expect(createSpy).toHaveBeenCalledWith(newPost);
    expect(loadSpy).toHaveBeenCalled();
  });

  it("getPost should return empty array when user get calls return empty array", (done) => {
    jest
      .spyOn(usersHttpStubService, "get")
      .mockReturnValueOnce(throwError(() => new Error()));

    service.loadPosts();

    service.getPosts().subscribe((posts) => {
      expect(posts).toHaveLength(0);
      done();
    });
  });
});
