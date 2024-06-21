import { Component } from '@angular/core';
import { TileComponent } from '../../components/tile/tile.component';

@Component({
  selector: 'app-posts-container',
  standalone: true,
  imports: [TileComponent],
  templateUrl: './posts-container.component.html',
  styleUrl: './posts-container.component.scss',
})
export class PostsContainerComponent {}
