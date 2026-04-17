import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OptionCheckboxComponent } from '../option-checkbox/option-checkbox.component';

@Component({
  selector: 'app-one-time-toggle',
  standalone: true,
  imports: [CommonModule, OptionCheckboxComponent],
  templateUrl: './one-time-toggle.component.html',
  styleUrl: './one-time-toggle.component.css',
})
export class OneTimeToggleComponent {
  @Input() isOneTimeView = false;
  @Output() isOneTimeViewChange = new EventEmitter<boolean>();

  onChange(value: boolean) {
    this.isOneTimeViewChange.emit(value);
  }
}
