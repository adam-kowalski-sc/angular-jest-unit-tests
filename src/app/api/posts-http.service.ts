import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { PostDto } from './posts-http.interfaces';

@Injectable({
  providedIn: 'root',
})
export class PostsHttpService {
  private readonly httpClient = inject(HttpClient);

  private readonly url = 'posts';

  get(): Observable<PostDto[]> {
    return this.httpClient.get<PostDto[]>(this.url);
  }
}
