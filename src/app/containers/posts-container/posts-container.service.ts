import { inject, Injectable } from "@angular/core";
import { UsersHttpService } from "../../api/users-http.service";
import { PostsHttpService } from "../../api/posts-http.service";

@Injectable()
export class PostsContainerService {
  private readonly usersHttpService = inject(UsersHttpService);
  private readonly postsHttpService = inject(PostsHttpService);
}
