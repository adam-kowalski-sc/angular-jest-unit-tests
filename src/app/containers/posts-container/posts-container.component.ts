import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  DestroyRef,
  inject,
  OnInit,
} from "@angular/core";
import { TileComponent } from "../../components/tile/tile.component";
import { Post } from "./posts-container.interfaces";
import { PostsContainerService } from "./posts-container.service";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { AddPostFormComponent } from "../../components/add-post-form/add-post-form.component";
import { PostCreationDto } from "../../api/posts-http.interfaces";
import { Observable } from "rxjs";
import { UserDto } from "../../api/users-http.interfaces";
import { UsersHttpService } from "../../api/users-http.service";
import { AsyncPipe } from "@angular/common";

@Component({
  selector: "app-posts-container",
  standalone: true,
  imports: [TileComponent, AddPostFormComponent, AsyncPipe],
  templateUrl: "./posts-container.component.html",
  styleUrl: "./posts-container.component.scss",
  providers: [PostsContainerService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostsContainerComponent implements OnInit {
  posts: Post[] = [];
  users$!: Observable<UserDto[]>;

  protected showAddForm = false;

  private readonly service = inject(PostsContainerService);
  private readonly userHttpService = inject(UsersHttpService);
  private readonly destroyRef = inject(DestroyRef);
  private readonly cd = inject(ChangeDetectorRef);

  ngOnInit(): void {
    this.service.loadPosts();
    this.users$ = this.userHttpService.get();
    this.service
      .getPosts()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((posts) => {
        this.posts = posts;
        this.cd.markForCheck();
      });
  }

  onAddClick(): void {
    this.showAddForm = true;
    this.cd.markForCheck();
  }

  onDeleteClick(id: string | number): void {
    this.service.deletePost(Number(id));
  }

  onCloseFormClick(): void {
    this.showAddForm = false;
    this.cd.markForCheck();
  }

  onSubmitFormClick(newPost: PostCreationDto): void {
    this.service.createPost(newPost);
    this.showAddForm = false;
  }
}
