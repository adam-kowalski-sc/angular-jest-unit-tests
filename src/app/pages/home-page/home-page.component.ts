import { Component } from '@angular/core';
import { PostsContainerComponent } from '../../containers/posts-container/posts-container.component';
import { UsersContainerComponent } from '../../containers/users-container/users-container.component';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [PostsContainerComponent, UsersContainerComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
})
export class HomePageComponent {}
