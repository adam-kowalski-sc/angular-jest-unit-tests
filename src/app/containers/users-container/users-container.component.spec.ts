import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
  waitForAsync,
} from "@angular/core/testing";

import { UsersContainerComponent } from "./users-container.component";
import { UsersHttpService } from "../../api/users-http.service";
import { UserDto } from "../../api/users-http.interfaces";
import { of } from "rxjs";
import { DebugElement } from "@angular/core";
import { By } from "@angular/platform-browser";

describe("UsersContainerComponent", () => {
  let component: UsersContainerComponent;
  let fixture: ComponentFixture<UsersContainerComponent>;
  let debugElement: DebugElement;

  const users: Partial<UserDto>[] = [
    {
      id: 1,
    },
  ];

  const usersHttpStubService: Partial<UsersHttpService> = {
    get: jest.fn().mockReturnValue(of(users)),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsersContainerComponent],
      providers: [
        {
          provide: UsersHttpService,
          useValue: usersHttpStubService,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(UsersContainerComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should display loader", () => {
    component.ngOnInit();
    const loader = debugElement.queryAll(By.css(".users-container__loader"))[0];

    expect(loader).toBeTruthy();
  });

  it("should display users list after 3 seconds", fakeAsync(() => {
    component.ngOnInit();

    tick(3000);

    fixture.detectChanges();
    const list = debugElement.queryAll(By.css(".users-container__list"))[0];

    expect(list).toBeTruthy();
  }));

  it("should display users list after 3 seconds version 2", waitForAsync(() => {
    component.ngOnInit();

    fixture.whenStable().then(() => {
      fixture.detectChanges();
      const list = debugElement.queryAll(By.css(".users-container__list"))[0];

      expect(list).toBeTruthy();
    });
  }));
});
