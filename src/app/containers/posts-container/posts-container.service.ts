import { inject, Injectable } from "@angular/core";
import { UsersHttpService } from "../../api/users-http.service";
import { PostsHttpService } from "../../api/posts-http.service";
import { BehaviorSubject, combineLatest, map, Observable, tap } from "rxjs";
import { Post } from "./posts-container.interfaces";
import { UserDto } from "../../api/users-http.interfaces";
import { PostCreationDto } from "../../api/posts-http.interfaces";

@Injectable()
export class PostsContainerService {
  private readonly usersHttpService = inject(UsersHttpService);
  private readonly postsHttpService = inject(PostsHttpService);

  private posts$$ = new BehaviorSubject<Post[]>([]);

  loadPosts(): void {
    combineLatest([this.usersHttpService.get(), this.postsHttpService.get()])
      .pipe(
        map(([users, posts]) => {
          if (!posts || !users) {
            return [];
          }

          const usersMap = this.getUsersMap(users);

          return posts.map((post) => ({
            title: post.title,
            content: post.content,
            id: post.id,
            author: usersMap.get(post.userId) ?? "",
          }));
        }),
        tap((items) => {
          this.posts$$.next(items);
        })
      )
      .subscribe();
  }

  getPosts(): Observable<Post[]> {
    return this.posts$$.asObservable();
  }

  deletePost(postId: number): void {
    this.postsHttpService.delete(postId).subscribe(() => {
      this.loadPosts();
    });
  }

  createPost(newPost: PostCreationDto): void {
    this.postsHttpService.post(newPost).subscribe(() => {
      this.loadPosts();
    });
  }

  private getUsersMap(users: UserDto[]): Map<number, string> {
    return users.reduce((result, item) => {
      result.set(Number(item.id), `${item.name} ${item.surname}`);
      return result;
    }, new Map<number, string>());
  }
}
