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

@Component({
  selector: "app-posts-container",
  standalone: true,
  imports: [TileComponent, AddPostFormComponent],
  templateUrl: "./posts-container.component.html",
  styleUrl: "./posts-container.component.scss",
  providers: [PostsContainerService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostsContainerComponent implements OnInit {
  posts: Post[] = [];

  protected showAddForm = false;

  private readonly service = inject(PostsContainerService);
  private readonly destroyRef = inject(DestroyRef);
  private readonly cd = inject(ChangeDetectorRef);

  ngOnInit(): void {
    this.service.loadPosts();
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
}
