import { DebugElement } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";

import { PostsContainerComponent } from "./posts-container.component";
import { UsersHttpService } from "../../api/users-http.service";
import { PostsContainerService } from "./posts-container.service";
import { of } from "rxjs";
import { By } from "@angular/platform-browser";

describe("PostsContainerComponent", () => {
  let component: PostsContainerComponent;
  let fixture: ComponentFixture<PostsContainerComponent>;
  let debugElement: DebugElement;

  const usersHttpStubService: Partial<UsersHttpService> = {
    get: jest.fn().mockImplementation(),
  };

  const postsContainerStubService: Partial<PostsContainerService> = {
    loadPosts: jest.fn().mockImplementation(),
    getPosts: jest.fn().mockReturnValue(of([])),
    deletePost: jest.fn().mockImplementation(),
    createPost: jest.fn().mockImplementation(),
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

    fixture = TestBed.createComponent(PostsContainerComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should display no data when getPost return empty array", () => {
    component.ngOnInit();

    const noDataDiv = debugElement.queryAll(
      By.css(".posts-container__no-data")
    );

    expect(noDataDiv).toHaveLength(1);
  });

  it("should display div with posts", () => {
    const posts = [
      {
        title: "title 1",
        content: "content 1",
        id: 1,
        author: "Tester Testowy",
      },
      {
        title: "title 2",
        content: "content 2",
        id: 2,
        author: "Testerka Testowa",
      },
    ];

    jest
      .spyOn(postsContainerStubService, "getPosts")
      .mockReturnValueOnce(of(posts));
    component.ngOnInit();
    fixture.detectChanges();

    const itemsListDiv = debugElement.queryAll(
      By.css(".posts-container__list")
    );

    expect(itemsListDiv).toHaveLength(1);
  });

  it("onDeleteClick should call deletePost", () => {
    const deleteSpy = jest.spyOn(postsContainerStubService, "deletePost");
    const id = 1;

    component.onDeleteClick(id);

    expect(deleteSpy).toHaveBeenCalledWith(id);
  });

  it("onSubmitFormClick should call createPost", () => {
    const createSpy = jest.spyOn(postsContainerStubService, "createPost");
    const newPost = {
      title: "title 1",
      content: "content",
      userId: 1,
    };

    component.onSubmitFormClick(newPost);

    expect(createSpy).toHaveBeenCalledWith(newPost);
  });

  it("onAddClick should display creation form", () => {
    const button = debugElement.queryAll(By.css(".posts-container__button"))[0]
      .nativeElement as HTMLButtonElement;

    button.dispatchEvent(new MouseEvent("click"));
    fixture.detectChanges();

    const formControls = debugElement.queryAll(
      By.css(".posts-container__form")
    );

    expect(formControls).toHaveLength(1);
  });

  it("onCloseFormClick should hide creation form", () => {
    component.onAddClick();
    fixture.detectChanges();

    const formControls = debugElement.queryAll(
      By.css(".posts-container__form")
    );

    expect(formControls).toHaveLength(1);

    component.onCloseFormClick();
    fixture.detectChanges();

    const button = debugElement.queryAll(By.css(".posts-container__button"));
    const formControlsAfterSubmit = debugElement.queryAll(
      By.css(".posts-container__form")
    );

    expect(button).toBeTruthy();
    expect(formControlsAfterSubmit).toHaveLength(0);
  });
});
