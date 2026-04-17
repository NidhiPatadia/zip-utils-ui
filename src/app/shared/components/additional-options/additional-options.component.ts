import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-additional-options',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './additional-options.component.html',
  styleUrl: './additional-options.component.css',
})
export class AdditionalOptionsComponent {
  @Input() title = 'Additional Options';
  @Input() isExpanded = false;
  @Output() toggle = new EventEmitter<void>();
}
