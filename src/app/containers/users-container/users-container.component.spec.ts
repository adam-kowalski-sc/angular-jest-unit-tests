import { ComponentFixture, TestBed } from "@angular/core/testing";

import { UsersContainerComponent } from "./users-container.component";
import { UsersHttpService } from "../../api/users-http.service";

describe("UsersContainerComponent", () => {
  let component: UsersContainerComponent;
  let fixture: ComponentFixture<UsersContainerComponent>;

  const usersHttpStubService: Partial<UsersHttpService> = {
    get: jest.fn().mockImplementation(),
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
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
