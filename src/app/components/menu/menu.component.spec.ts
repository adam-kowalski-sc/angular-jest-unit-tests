import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from "@angular/core/testing";

import { MenuComponent } from "./menu.component";
import {
  RouterTestingHarness,
  RouterTestingModule,
} from "@angular/router/testing";
import { provideRouter, Router, RouterLink } from "@angular/router";
import { Component } from "@angular/core";
import { By } from "@angular/platform-browser";

@Component({
  selector: "app-posts-page",
  template: `<div class="posts-page">posts page</div>`,
  standalone: true,
})
class PostsPageStubComponent {}

@Component({
  selector: "app-users-page",
  template: `<div class="users-page">users page</div>`,
  standalone: true,
})
class UsersPageStubComponent {}

describe("MenuComponent", () => {
  let component: MenuComponent;
  let fixture: ComponentFixture<MenuComponent>;
  let harness: RouterTestingHarness;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MenuComponent],
      providers: [
        provideRouter([
          {
            path: "",
            pathMatch: "full",
            redirectTo: "users",
          },
          {
            path: "users",
            component: UsersPageStubComponent,
          },
          {
            path: "posts",
            component: PostsPageStubComponent,
          },
        ]),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(MenuComponent);
    harness = await RouterTestingHarness.create();
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should navigate to users page", async () => {
    const activatedComponent = await harness.navigateByUrl("users");

    expect(activatedComponent).toBeInstanceOf(UsersPageStubComponent);
    expect(
      harness.routeNativeElement?.querySelector(".users-page")
    ).toBeTruthy();
  });

  it("should navigate to posts page", async () => {
    const activatedComponent = await harness.navigateByUrl("posts");

    expect(activatedComponent).toBeInstanceOf(PostsPageStubComponent);
    expect(
      harness.routeNativeElement?.querySelector(".posts-page")
    ).toBeTruthy();
  });

  it("should return menu with 3 router links and valid menu items", async () => {
    // get debug elements
    const linkDirectives = fixture.debugElement.queryAll(
      By.directive(RouterLink)
    );
    const routerLinks = linkDirectives.map((de) => de.injector.get(RouterLink));

    expect(linkDirectives).toHaveLength(3);
    expect(routerLinks[0].href).toBe("/");
    expect(routerLinks[1].href).toBe("/users");
    expect(routerLinks[2].href).toBe("/posts");
  });

  it("clicking on page title should redirect to users page", fakeAsync(() => {
    const linkDirectives = fixture.debugElement.queryAll(
      By.directive(RouterLink)
    );

    // 0 means left button on mouse
    linkDirectives[0].triggerEventHandler("click", { button: 0 });
    tick();
    fixture.detectChanges();

    expect(router.url).toBe("/users");
  }));

  it("clicking on posts link title should redirect to posts page", fakeAsync(() => {
    const linkDirectives = fixture.debugElement.queryAll(
      By.directive(RouterLink)
    );
    linkDirectives[2].triggerEventHandler("click", { button: 0 });
    tick();
    fixture.detectChanges();

    expect(router.url).toBe("/posts");
  }));
});
