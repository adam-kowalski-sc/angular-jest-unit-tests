import { Component, inject, OnInit } from "@angular/core";
import { TileComponent } from "../../components/tile/tile.component";
import { UsersHttpService } from "../../api/users-http.service";
import { UserDto } from "../../api/users-http.interfaces";
import { Observable } from "rxjs";
import { AsyncPipe } from "@angular/common";

@Component({
  selector: "app-users-container",
  standalone: true,
  imports: [AsyncPipe, TileComponent],
  templateUrl: "./users-container.component.html",
  styleUrl: "./users-container.component.scss",
})
export class UsersContainerComponent implements OnInit {
  users$!: Observable<UserDto[]>;
  loading = true;

  private readonly httpClient = inject(UsersHttpService);

  ngOnInit(): void {
    this.users$ = this.httpClient.get();

    setTimeout(() => {
      this.loading = false;
    }, 3000);
  }
}
