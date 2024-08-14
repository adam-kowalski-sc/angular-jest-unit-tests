import { ComponentFixture, TestBed } from "@angular/core/testing";

import { PostsPageComponent } from "./posts-page.component";
import { Component } from "@angular/core";
import { PostsContainerComponent } from "../../containers/posts-container/posts-container.component";

@Component({
  selector: "app-posts-container",
  template: "",
  standalone: true,
})
class PostsContainerStubComponent {}

describe("PostsPageComponent", () => {
  let component: PostsPageComponent;
  let fixture: ComponentFixture<PostsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PostsPageComponent],
    })
      .overrideComponent(PostsPageComponent, {
        remove: {
          imports: [PostsContainerComponent],
        },
        add: {
          imports: [PostsContainerStubComponent],
        },
      })
      .compileComponents();

    fixture = TestBed.createComponent(PostsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
