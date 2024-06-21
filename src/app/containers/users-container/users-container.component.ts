import { Component } from '@angular/core';
import { TileComponent } from '../../components/tile/tile.component';

@Component({
  selector: 'app-users-container',
  standalone: true,
  imports: [TileComponent],
  templateUrl: './users-container.component.html',
  styleUrl: './users-container.component.scss',
})
export class UsersContainerComponent {}
