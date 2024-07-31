import { Component, OnInit } from "@angular/core";
import { TileComponent } from "../../components/tile/tile.component";
import { Observable } from "rxjs";
import { Post } from "./posts-container.interfaces";

@Component({
  selector: "app-posts-container",
  standalone: true,
  imports: [TileComponent],
  templateUrl: "./posts-container.component.html",
  styleUrl: "./posts-container.component.scss",
})
export class PostsContainerComponent implements OnInit {
  posts$!: Observable<Post[]>;

  ngOnInit(): void {}
}
