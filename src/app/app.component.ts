import { Component, OnInit, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UsersHttpService } from './api/users-http.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'dev-meeting';

  private readonly httpClient = inject(UsersHttpService);

  ngOnInit(): void {
    this.httpClient.get().subscribe((users) => {
      console.log(users);
    });
  }
}
