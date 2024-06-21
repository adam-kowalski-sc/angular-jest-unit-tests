import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { UserDto } from './users-http.interfaces';

@Injectable({
  providedIn: 'root',
})
export class UsersHttpService {
  private readonly httpClient = inject(HttpClient);

  private readonly url = 'users';

  get(): Observable<UserDto[]> {
    return this.httpClient.get<UserDto[]>(this.url);
  }
}
