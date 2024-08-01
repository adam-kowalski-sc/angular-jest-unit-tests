import { Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
  selector: "app-tile",
  standalone: true,
  imports: [],
  templateUrl: "./tile.component.html",
  styleUrl: "./tile.component.scss",
})
export class TileComponent {
  @Input() id: string | number | undefined;
  @Input() title: string = "";
  @Input() subtitle: string = "";
  @Input() content: string = "";
  @Input() showDeleteButton: boolean = false;

  @Output() delete = new EventEmitter<number | string>();

  onDeleteClick(): void {
    if (this.id) {
      this.delete.emit(this.id);
    }
  }
}
