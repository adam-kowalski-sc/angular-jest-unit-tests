import { Routes } from "@angular/router";
import { UsersPageComponent } from "./pages/users-page/users-page.component";
import { PostsPageComponent } from "./pages/posts-page/posts-page.component";

export const routes: Routes = [
  {
    path: "",
    pathMatch: "full",
    redirectTo: "users",
  },
  {
    path: "users",
    component: UsersPageComponent,
  },
  {
    path: "posts",
    component: PostsPageComponent,
  },
];
