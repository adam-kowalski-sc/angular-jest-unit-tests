import { TestBed } from "@angular/core/testing";

import { UsersHttpService } from "./users-http.service";
import { provideHttpClient } from "@angular/common/http";
import { provideHttpClientTesting } from "@angular/common/http/testing";

describe("UsersHttpService", () => {
  let service: UsersHttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(UsersHttpService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
