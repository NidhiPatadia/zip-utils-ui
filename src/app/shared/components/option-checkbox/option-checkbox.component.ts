import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-option-checkbox',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './option-checkbox.component.html',
  styleUrl: './option-checkbox.component.css',
})
export class OptionCheckboxComponent {
  @Input() title!: string;
  @Input() subtitle?: string;

  @Input() get checked(): boolean {
    return this._checked;
  }

  set checked(value: boolean) {
    this._checked = value;
  }

  private _checked = false;

  @Output() checkedChange = new EventEmitter<boolean>();

  onChange(event: Event) {
    const value = (event.target as HTMLInputElement).checked;
    this._checked = value;
    this.checkedChange.emit(value);
  }
}
