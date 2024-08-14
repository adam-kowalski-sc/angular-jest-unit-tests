import { ComponentFixture, TestBed } from "@angular/core/testing";

import { UsersPageComponent } from "./users-page.component";
import { Component } from "@angular/core";
import { UsersContainerComponent } from "../../containers/users-container/users-container.component";

@Component({
  selector: "app-users-container",
  template: "",
  standalone: true,
})
class UsersContainerStubComponent {}

describe("UsersPageComponent", () => {
  let component: UsersPageComponent;
  let fixture: ComponentFixture<UsersPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsersPageComponent],
    })
      .overrideComponent(UsersPageComponent, {
        remove: {
          imports: [UsersContainerComponent],
        },
        add: {
          imports: [UsersContainerStubComponent],
        },
      })
      .compileComponents();

    fixture = TestBed.createComponent(UsersPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
