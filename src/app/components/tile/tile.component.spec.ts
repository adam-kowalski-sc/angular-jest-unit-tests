import { ComponentFixture, TestBed } from "@angular/core/testing";

import { TileComponent } from "./tile.component";
import { DebugElement } from "@angular/core";
import { By } from "@angular/platform-browser";

describe("TileComponent", () => {
  let component: TileComponent;
  let fixture: ComponentFixture<TileComponent>;
  let debugElement: DebugElement;

  const title = "title";
  const subtitle = "subtitle";

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TileComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TileComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should display title and subtitle", () => {
    component.title = title;
    component.subtitle = subtitle;
    fixture.detectChanges();

    const titleTags = debugElement.queryAll(By.css(".title"));
    const subTitleTags = debugElement.queryAll(By.css(".subtitle"));

    expect(titleTags[0].nativeElement.textContent).toEqual(title);
    expect(subTitleTags[0].nativeElement.textContent).toEqual(subtitle);
  });

  it("should display title and subtitle", () => {
    component.title = title;
    component.subtitle = subtitle;
    fixture.detectChanges();

    const titleTags = debugElement.queryAll(By.css(".title"));
    const subTitleTags = debugElement.queryAll(By.css(".subtitle"));

    expect(titleTags[0].nativeElement.textContent).toEqual(title);
    expect(subTitleTags[0].nativeElement.textContent).toEqual(subtitle);
  });

  it("should display content when content input is not empty string", () => {
    const content = "test content";
    component.content = content;
    fixture.detectChanges();

    const tileContent = debugElement.queryAll(By.css(".card-text"));

    expect(tileContent[0]).toBeTruthy();
    expect(tileContent[0].nativeElement.textContent).toEqual(content);
  });

  it("should not display content when content input is empty string", () => {
    const content = "";
    component.content = content;
    fixture.detectChanges();

    const tileContent = debugElement.queryAll(By.css(".card-text"));

    expect(tileContent[0]).toBeFalsy();
  });

  it.each([
    { inputValue: true, buttonShouldBeVisible: true },
    { inputValue: false, buttonShouldBeVisible: false },
  ])(
    "display button equals to $buttonShouldBeVisible for input value equals to $inputValue",
    ({ inputValue, buttonShouldBeVisible }) => {
      component.showDeleteButton = inputValue;
      fixture.detectChanges();

      const button = debugElement.queryAll(By.css(".btn-danger"))[0];

      buttonShouldBeVisible
        ? expect(button).toBeTruthy()
        : expect(button).toBeFalsy();
    }
  );

  it("should emit delete click event with proper id when call onDeleteClick", () => {
    const id = 1;
    component.id = id;
    fixture.detectChanges();

    const emitSpy = jest.spyOn(component.delete, "emit");
    component.onDeleteClick();

    expect(emitSpy).toHaveBeenCalledWith(id);
  });

  it("should emit delete click event with proper id when click on delete button", () => {
    const id = 1;
    component.id = id;
    component.showDeleteButton = true;
    fixture.detectChanges();

    const emitSpy = jest.spyOn(component.delete, "emit");
    const button = debugElement.queryAll(By.css(".btn-danger"))[0]
      .nativeElement as HTMLButtonElement;

    button.dispatchEvent(new MouseEvent("click"));

    expect(emitSpy).toHaveBeenCalledTimes(1);
  });
});
