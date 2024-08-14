import { ComponentFixture, TestBed } from "@angular/core/testing";

import { PostsContainerComponent } from "./posts-container.component";
import { UsersHttpService } from "../../api/users-http.service";
import { PostsContainerService } from "./posts-container.service";
import { of } from "rxjs";

describe("PostsContainerComponent", () => {
  let component: PostsContainerComponent;
  let fixture: ComponentFixture<PostsContainerComponent>;

  const usersHttpStubService: Partial<UsersHttpService> = {
    get: jest.fn().mockImplementation(),
  };

  const postsContainerStubService: Partial<PostsContainerService> = {
    loadPosts: jest.fn().mockImplementation(),
    getPosts: jest.fn().mockReturnValue(of([])),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PostsContainerComponent],
      providers: [
        {
          provide: UsersHttpService,
          useValue: usersHttpStubService,
        },
        {
          provide: PostsContainerService,
          useValue: {},
        },
      ],
    })
      .overrideComponent(PostsContainerComponent, {
        set: {
          providers: [
            {
              provide: PostsContainerService,
              useValue: postsContainerStubService,
            },
          ],
        },
      })
      .compileComponents();

    UsersHttpService;

    fixture = TestBed.createComponent(PostsContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
