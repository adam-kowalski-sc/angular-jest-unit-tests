import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { PostCreationDto } from "../../api/posts-http.interfaces";
import { UserDto } from "../../api/users-http.interfaces";

@Component({
  selector: "app-add-post-form",
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: "./add-post-form.component.html",
  styleUrl: "./add-post-form.component.scss",
})
export class AddPostFormComponent implements OnInit {
  @Input() users: UserDto[] = [];

  @Output() close = new EventEmitter<void>();
  @Output() submitForm = new EventEmitter<PostCreationDto>();

  formGroup!: FormGroup;

  ngOnInit(): void {
    this.createForm();
  }

  onSubmit(): void {
    const formData = this.formGroup.getRawValue() as PostCreationDto;
    this.submitForm.emit({
      ...formData,
      userId: Number(formData.userId),
    });
  }

  onCloseClick(): void {
    this.close.emit();
  }

  private createForm(): void {
    this.formGroup = new FormGroup({
      title: new FormControl<string | null>(null, Validators.required),
      content: new FormControl<string | null>(null),
      userId: new FormControl<number | null>(null, Validators.required),
    });
  }
}
