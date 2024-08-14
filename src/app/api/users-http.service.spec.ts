import { TestBed } from "@angular/core/testing";

import { UsersHttpService } from "./users-http.service";
import { provideHttpClient } from "@angular/common/http";
import {
  HttpTestingController,
  provideHttpClientTesting,
} from "@angular/common/http/testing";
import { UserDto } from "./users-http.interfaces";

describe("UsersHttpService", () => {
  let service: UsersHttpService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(UsersHttpService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    TestBed.inject(HttpTestingController).verify();
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });

  it("get should make GET request and return array of 2 users", () => {
    const users: UserDto[] = [
      {
        id: 1,
        name: "Jan",
        surname: "Testowy",
      },
      {
        id: 2,
        name: "Janina",
        surname: "Nowakowska",
      },
    ];

    service.get().subscribe((users) => {
      expect(users).toBeTruthy();
      expect(users).toHaveLength(2);
    });

    const req = httpTestingController.expectOne("users");

    expect(req.request.method).toEqual("GET");

    req.flush(users);
  });
});
