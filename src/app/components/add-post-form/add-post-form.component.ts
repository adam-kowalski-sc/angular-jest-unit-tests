import { Component, OnInit } from "@angular/core";
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";

@Component({
  selector: "app-add-post-form",
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: "./add-post-form.component.html",
  styleUrl: "./add-post-form.component.scss",
})
export class AddPostFormComponent implements OnInit {
  formGroup!: FormGroup;

  ngOnInit(): void {
    this.createForm();
  }

  onSubmit(): void {
    console.log("submit click");
  }

  private createForm(): void {
    this.formGroup = new FormGroup({
      title: new FormControl<string | null>(null, Validators.required),
      content: new FormControl<string | null>(null),
      userId: new FormControl<number | null>(null, Validators.required),
    });
  }
}
