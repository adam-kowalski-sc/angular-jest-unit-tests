import { Component } from "@angular/core";
import { UsersContainerComponent } from "../../containers/users-container/users-container.component";

@Component({
  selector: "app-users-page",
  standalone: true,
  imports: [UsersContainerComponent],
  templateUrl: "./users-page.component.html",
  styleUrl: "./users-page.component.scss",
})
export class UsersPageComponent {}
