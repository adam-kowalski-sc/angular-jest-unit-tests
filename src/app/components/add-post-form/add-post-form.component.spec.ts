import { ComponentFixture, TestBed } from "@angular/core/testing";

import { AddPostFormComponent } from "./add-post-form.component";
import { PostCreationDto } from "../../api/posts-http.interfaces";

describe("AddPostFormComponent", () => {
  let component: AddPostFormComponent;
  let fixture: ComponentFixture<AddPostFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddPostFormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AddPostFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("onCloseClick should emit close event", () => {
    const closeSpy = jest.spyOn(component.close, "emit");

    component.onCloseClick();

    expect(closeSpy).toHaveBeenCalled();
  });

  it("onSubmit should emit submitForm event", () => {
    const submitFormSpy = jest.spyOn(component.submitForm, "emit");

    component.ngOnInit();

    const newPostData: PostCreationDto = {
      title: "test",
      content: "content",
      userId: 1,
    };

    const formGroup = component["formGroup"];
    formGroup.patchValue(newPostData);

    component.onSubmit();

    expect(submitFormSpy).toHaveBeenCalledWith(newPostData);
  });

  it("after component initialization formGroup should not be null", () => {
    component.ngOnInit();

    const formGroup = component["formGroup"];

    expect(formGroup).not.toBeUndefined();
  });
});
