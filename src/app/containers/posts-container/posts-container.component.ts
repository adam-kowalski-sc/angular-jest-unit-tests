import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  DestroyRef,
  inject,
  OnInit,
} from "@angular/core";
import { TileComponent } from "../../components/tile/tile.component";
import { Observable } from "rxjs";
import { Post } from "./posts-container.interfaces";
import { PostsContainerService } from "./posts-container.service";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";

@Component({
  selector: "app-posts-container",
  standalone: true,
  imports: [TileComponent],
  templateUrl: "./posts-container.component.html",
  styleUrl: "./posts-container.component.scss",
  providers: [PostsContainerService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostsContainerComponent implements OnInit {
  posts: Post[] = [];

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
    console.log("add click");
  }

  onDeleteClick(id: string | number): void {
    this.service.deletePost(Number(id));
  }
}
