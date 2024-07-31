import { Component } from "@angular/core";
import { PostsContainerComponent } from "../../containers/posts-container/posts-container.component";

@Component({
  selector: "app-posts-page",
  standalone: true,
  imports: [PostsContainerComponent],
  templateUrl: "./posts-page.component.html",
  styleUrl: "./posts-page.component.scss",
})
export class PostsPageComponent {}
